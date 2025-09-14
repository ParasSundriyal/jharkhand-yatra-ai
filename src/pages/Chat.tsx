import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Mic, MicOff, Volume2, Bot, User, Globe, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste! Welcome to Jharkhand Tourism AI Assistant. I can help you in multiple languages including Hindi, Bengali, Santali, and English. How can I assist you today?",
      language: "en",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱞᱤ" },
    { code: "ur", name: "Urdu", native: "اردو" },
    { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" }
  ];

  const quickQuestions = [
    "What are the best places to visit in Jharkhand?",
    "How do I reach Netarhat from Ranchi?",
    "Tell me about tribal culture in Jharkhand",
    "What are the popular festivals here?",
    "Suggest a 3-day itinerary",
    "Where can I buy authentic handicrafts?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      language: selectedLanguage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        places: "Jharkhand offers incredible destinations like Netarhat (Queen of Chotanagpur), Betla National Park for wildlife, Hundru Falls, Jonha Falls, and the beautiful tribal villages around Khunti. Each place has its unique charm and cultural significance.",
        reach: "From Ranchi to Netarhat, you can take a bus (4-5 hours) or hire a taxi (3 hours). The route goes through Kanke-Khiju-Daltonganj road. I recommend starting early morning to catch the famous Netarhat sunrise!",
        culture: "Jharkhand's tribal culture is incredibly rich! The major tribes include Santhal, Munda, Ho, and Oraon. They have unique traditions, folk dances like Jhumar and Domkach, beautiful handicrafts, and festivals like Sarhul and Karma. You can visit tribal museums in Ranchi to learn more.",
        festivals: "Major festivals include Sarhul (spring festival), Karma (harvest festival), Sohrai (harvest festival), and Tusu (winter festival). These celebrations feature traditional music, dance, and community gatherings that showcase the vibrant tribal culture.",
        itinerary: "Here's a perfect 3-day plan:\nDay 1: Ranchi city tour - Tribal Museum, Tagore Hill, local markets\nDay 2: Netarhat - sunrise point, tribal village visit\nDay 3: Betla National Park - wildlife safari, Palamau Fort\nWould you like detailed timings and activities?",
        handicrafts: "For authentic tribal handicrafts, visit:\n• Main Road Market in Ranchi\n• Tribal Research Institute showroom\n• Khadi Gramodyog Bhavan\n• Local tribal villages near Khunti\nLook for bamboo crafts, dokra art, handwoven textiles, and traditional jewelry."
      };

      const responseKey = Object.keys(responses).find(key => 
        inputMessage.toLowerCase().includes(key) || 
        inputMessage.toLowerCase().includes(responses[key].toLowerCase().split(' ')[0])
      );

      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        text: responseKey ? responses[responseKey] : "Thank you for your question! I'd be happy to help you explore Jharkhand. Could you please be more specific about what you'd like to know? I can help with destinations, cultural experiences, transport, accommodation, or any other travel-related queries.",
        language: selectedLanguage,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const speakMessage = (text: string) => {
    // Text-to-speech would be implemented here
    console.log("Speaking:", text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Multilingual AI Tourism Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant, personalized assistance in your preferred language
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Language & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span>{lang.native}</span>
                          <span className="text-muted-foreground">({lang.name})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left h-auto p-3 justify-start"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Tourism AI Assistant</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {isTyping ? "Typing..." : "Online • Multilingual Support"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {languages.find(l => l.code === selectedLanguage)?.native}
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                        {message.sender === "bot" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                            onClick={() => speakMessage(message.text)}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t flex-shrink-0">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Type your message in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                        isListening ? "text-red-500" : "text-muted-foreground"
                      }`}
                      onClick={toggleListening}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-hero hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {isListening ? "🎤 Listening... Speak now" : "Press Enter to send • Click mic for voice input"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;