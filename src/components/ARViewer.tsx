import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Camera, 
  Eye, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Info,
  Navigation,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  X,
  MapPin,
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

interface ARViewerProps {
  touristSpots: TouristSpot[];
  selectedSpot?: TouristSpot | null;
  onSpotSelect?: (spot: TouristSpot) => void;
}

const ARViewer: React.FC<ARViewerProps> = ({ 
  touristSpots, 
  selectedSpot, 
  onSpotSelect 
}) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isARActive, setIsARActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [currentSpotIndex, setCurrentSpotIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [arMode, setArMode] = useState<'preview' | 'live' | 'virtual'>('preview');

  const arSpots = touristSpots.map(spot => ({
    ...spot,
    arData: {
      virtualTour: `Experience ${spot.name} in 360° virtual reality`,
      interactiveElements: spot.highlights,
      audioGuide: `Welcome to ${spot.name}. ${spot.description}`,
      hotspots: [
        { x: 30, y: 40, info: spot.highlights[0] || 'Main attraction' },
        { x: 70, y: 30, info: spot.highlights[1] || 'Secondary point' },
        { x: 50, y: 60, info: spot.highlights[2] || 'Additional feature' }
      ]
    }
  }));

  useEffect(() => {
    return () => {
      if (isARActive) {
        stopAR();
      }
    };
  }, []);

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setCameraPermission('granted');
      setIsARActive(true);
      setArMode('live');
      
      toast({
        title: "AR Mode Activated",
        description: "Point your camera around to explore virtual information",
      });
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraPermission('denied');
      toast({
        title: "Camera Access Denied",
        description: "Enable camera permissions to use AR features",
        variant: "destructive",
      });
    }
  };

  const stopAR = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
    setArMode('preview');
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const element = document.getElementById('ar-container');
      element?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const playAudioGuide = (text: string) => {
    if (!isAudioEnabled) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const renderAROverlay = () => {
    if (!selectedSpot || !overlayVisible) return null;

    const currentSpot = arSpots.find(s => s.id === selectedSpot.id);
    if (!currentSpot) return null;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* AR Hotspots */}
        {currentSpot.arData.hotspots.map((hotspot, index) => (
          <div
            key={index}
            className="absolute pointer-events-auto"
            style={{ 
              left: `${hotspot.x}%`, 
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative group">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {hotspot.info}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* AR Info Panel */}
        <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{currentSpot.name}</span>
            <div className="flex items-center gap-1 ml-auto">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm">{currentSpot.rating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-300 mb-3">{currentSpot.description}</p>
          <div className="flex flex-wrap gap-1">
            {currentSpot.highlights.slice(0, 3).map((highlight, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* AR Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg">
          <p className="text-sm text-center">
            Move your device to explore • Tap hotspots for info
          </p>
        </div>
      </div>
    );
  };

  const renderVirtualPreview = () => {
    if (!selectedSpot) return null;

    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-lg overflow-hidden">
        {/* Virtual Environment */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{ 
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:rgb(100,200,255);stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:rgb(0,100,200);stop-opacity:0.3" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad1)" />
                <circle cx="100" cy="100" r="30" fill="rgba(255,255,255,0.3)" />
                <circle cx="300" cy="150" r="20" fill="rgba(255,255,255,0.2)" />
                <circle cx="200" cy="200" r="25" fill="rgba(255,255,255,0.4)" />
                <text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle">
                  ${selectedSpot.name}
                </text>
              </svg>
            `)}')`
          }}
        >
          {/* Interactive Elements */}
          <div className="absolute inset-0">
            {selectedSpot.highlights.map((highlight, index) => (
              <div
                key={index}
                className="absolute cursor-pointer transform transition-transform hover:scale-110"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 20}%`,
                }}
                onClick={() => playAudioGuide(`Learn more about ${highlight} at ${selectedSpot.name}`)}
              >
                <div className="w-8 h-8 bg-white/20 border-2 border-white rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Info className="h-4 w-4 text-white" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-white text-xs font-medium">
                  {highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Tour Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setRotation(r => r - 90)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setZoom(z => Math.min(3, z + 0.2))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          >
            {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          AR Experience Viewer
          {selectedSpot && (
            <Badge variant="outline" className="ml-auto">
              {selectedSpot.name}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AR Mode Selection */}
        <div className="flex gap-2">
          <Button
            variant={arMode === 'preview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setArMode('preview')}
          >
            Preview Mode
          </Button>
          <Button
            variant={arMode === 'virtual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setArMode('virtual')}
          >
            Virtual Tour
          </Button>
          <Button
            variant={arMode === 'live' ? 'default' : 'outline'}
            size="sm"
            onClick={isARActive ? stopAR : startAR}
          >
            <Camera className="h-4 w-4 mr-2" />
            {isARActive ? 'Stop AR' : 'Live AR'}
          </Button>
        </div>

        {/* AR Viewer Container */}
        <div id="ar-container" className="relative">
          {arMode === 'live' && isARActive ? (
            <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              {renderAROverlay()}
              
              {/* AR Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="secondary" onClick={() => setOverlayVisible(!overlayVisible)}>
                  {overlayVisible ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4 opacity-50" />}
                </Button>
                <Button size="sm" variant="secondary" onClick={toggleFullscreen}>
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" onClick={stopAR}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : arMode === 'virtual' ? (
            renderVirtualPreview()
          ) : (
            <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <Camera className="h-16 w-16 text-primary mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">AR Preview Mode</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Experience {selectedSpot?.name || 'tourist destinations'} in augmented reality
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => setArMode('virtual')}>
                      <Play className="h-4 w-4 mr-2" />
                      Virtual Tour
                    </Button>
                    <Button variant="outline" onClick={startAR}>
                      <Camera className="h-4 w-4 mr-2" />
                      Launch AR
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spot Selection */}
        {!selectedSpot && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Select a destination for AR experience:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {touristSpots.slice(0, 6).map((spot) => (
                <Button
                  key={spot.id}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left"
                  onClick={() => onSpotSelect?.(spot)}
                >
                  <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{spot.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* AR Features Info */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">AR Features:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>• Interactive hotspots</div>
            <div>• 360° virtual tours</div>
            <div>• Audio guide narration</div>
            <div>• Real-time information overlay</div>
            <div>• Zoom and rotation controls</div>
            <div>• Fullscreen immersion</div>
          </div>
        </div>

        {/* Camera Permission Notice */}
        {cameraPermission === 'denied' && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Camera access is required for live AR features. Please enable camera permissions and refresh the page.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ARViewer;