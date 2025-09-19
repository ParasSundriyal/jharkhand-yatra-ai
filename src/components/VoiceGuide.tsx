import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  MapPin,
  Navigation,
  Clock,
  Star
} from 'lucide-react';

interface TouristSpot {
  id: number;
  name: string;
  category: string;
  rating: number;
  coordinates: number[];
  description: string;
  highlights: string[];
  difficulty: string;
  timeRequired: string;
  bestTime: string;
}

interface VoiceGuideProps {
  touristSpots: TouristSpot[];
  selectedSpot?: TouristSpot | null;
  onSpotSelect?: (spot: TouristSpot) => void;
}

const VoiceGuide: React.FC<VoiceGuideProps> = ({ 
  touristSpots, 
  selectedSpot, 
  onSpotSelect 
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Guide content for different spots
  const guideContent = touristSpots.map(spot => ({
    spot: spot,
    introduction: `Welcome to ${spot.name}, a beautiful ${spot.category.toLowerCase()} in Jharkhand. ${spot.description}`,
    highlights: `The main highlights here include: ${spot.highlights.join(', ')}. This place has a ${spot.rating} star rating from visitors.`,
    practicalInfo: `Best time to visit is ${spot.bestTime}. You'll need about ${spot.timeRequired} for your visit. The difficulty level is ${spot.difficulty}.`,
    conclusion: `That concludes our guide to ${spot.name}. Enjoy your visit and don't forget to capture some memories!`
  }));

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Unable to understand. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (currentUtteranceRef.current && synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  const handleVoiceCommand = (command: string) => {
    if (command.includes('tell me about') || command.includes('describe')) {
      const spotName = touristSpots.find(spot => 
        command.includes(spot.name.toLowerCase())
      );
      if (spotName) {
        onSpotSelect?.(spotName);
        startGuide(spotName);
      } else {
        speak("Which place would you like to know about?");
      }
    } else if (command.includes('next') || command.includes('continue')) {
      nextSection();
    } else if (command.includes('previous') || command.includes('back')) {
      previousSection();
    } else if (command.includes('stop') || command.includes('pause')) {
      stopSpeaking();
    } else if (command.includes('repeat')) {
      repeatCurrentSection();
    } else if (command.includes('start guide')) {
      if (selectedSpot) {
        startGuide(selectedSpot);
      } else {
        speak("Please select a destination first.");
      }
    } else {
      speak("I didn't understand that command. Try saying 'tell me about Netarhat' or 'start guide'.");
    }
  };

  const speak = (text: string, onEnd?: () => void) => {
    if (!synthesisRef.current) {
      toast({
        title: "Speech Not Supported",
        description: "Text-to-speech is not supported on this device.",
        variant: "destructive",
      });
      return;
    }

    // Cancel any ongoing speech
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "Unable to play audio. Please try again.",
        variant: "destructive",
      });
    };

    currentUtteranceRef.current = utterance;
    synthesisRef.current.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Voice commands are not supported on this device.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak your command now.",
      });
    } catch (error) {
      setIsListening(false);
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    setIsSpeaking(false);
    setIsPlaying(false);
  };

  const startGuide = (spot: TouristSpot) => {
    const guideIndex = guideContent.findIndex(g => g.spot.id === spot.id);
    if (guideIndex !== -1) {
      setCurrentGuideIndex(0);
      setIsPlaying(true);
      speak(guideContent[guideIndex].introduction);
    }
  };

  const nextSection = () => {
    if (!selectedSpot) return;
    
    const guide = guideContent.find(g => g.spot.id === selectedSpot.id);
    if (!guide) return;

    const sections = [guide.introduction, guide.highlights, guide.practicalInfo, guide.conclusion];
    const nextIndex = (currentGuideIndex + 1) % sections.length;
    setCurrentGuideIndex(nextIndex);
    speak(sections[nextIndex]);
  };

  const previousSection = () => {
    if (!selectedSpot) return;
    
    const guide = guideContent.find(g => g.spot.id === selectedSpot.id);
    if (!guide) return;

    const sections = [guide.introduction, guide.highlights, guide.practicalInfo, guide.conclusion];
    const prevIndex = currentGuideIndex === 0 ? sections.length - 1 : currentGuideIndex - 1;
    setCurrentGuideIndex(prevIndex);
    speak(sections[prevIndex]);
  };

  const repeatCurrentSection = () => {
    if (!selectedSpot) return;
    
    const guide = guideContent.find(g => g.spot.id === selectedSpot.id);
    if (!guide) return;

    const sections = [guide.introduction, guide.highlights, guide.practicalInfo, guide.conclusion];
    speak(sections[currentGuideIndex]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (currentUtteranceRef.current) {
      // Restart current speech with new volume
      const text = currentUtteranceRef.current.text;
      stopSpeaking();
      setTimeout(() => speak(text), 100);
    }
  };

  const sectionNames = ['Introduction', 'Highlights', 'Practical Info', 'Conclusion'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          AI Voice Guide
          {selectedSpot && (
            <Badge variant="outline" className="ml-auto">
              {selectedSpot.name}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Control Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
          >
            {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
            {isListening ? 'Stop Listening' : 'Voice Command'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>

          {selectedSpot && (
            <Button
              variant="default"
              size="sm"
              onClick={() => startGuide(selectedSpot)}
              disabled={isSpeaking}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Guide
            </Button>
          )}
        </div>

        {/* Playback Controls */}
        {selectedSpot && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Section:</span>
              <Badge variant="secondary">
                {sectionNames[currentGuideIndex] || 'Introduction'}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={previousSection}
                disabled={isSpeaking}
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={isSpeaking ? stopSpeaking : repeatCurrentSection}
              >
                {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={nextSection}
                disabled={isSpeaking}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full"
                disabled={isMuted}
              />
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="space-y-2">
          {isListening && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Listening for voice commands...
            </div>
          )}
          
          {isSpeaking && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Speaking...
            </div>
          )}
        </div>

        {/* Quick Commands */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Voice Commands:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>"Tell me about [place name]"</div>
            <div>"Start guide"</div>
            <div>"Next" / "Previous"</div>
            <div>"Stop" / "Pause"</div>
            <div>"Repeat"</div>
            <div>"Continue"</div>
          </div>
        </div>

        {/* Selected Spot Info */}
        {selectedSpot && (
          <div className="p-4 bg-muted/20 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{selectedSpot.name}</span>
              <div className="flex items-center gap-1 ml-auto">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-sm">{selectedSpot.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {selectedSpot.timeRequired}
              </div>
              <Badge variant="outline" className="text-xs">
                {selectedSpot.difficulty}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceGuide;