import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Assistant. I'm here to help you with your studies, answer questions, and provide support. What would you like to know today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Study-related responses
    if (lowerMessage.includes("study") || lowerMessage.includes("learn")) {
      return "Great question about studying! Here are some tips: 1) Create a consistent study schedule, 2) Take regular breaks using the Pomodoro technique, 3) Use active recall by testing yourself, 4) Organize your notes by subject. Would you like specific advice for any subject?";
    }
    
    if (lowerMessage.includes("math") || lowerMessage.includes("mathematics")) {
      return "Math can be challenging but rewarding! Try breaking problems into smaller steps, practice regularly, and don't hesitate to ask for help when needed. Would you like me to explain any specific math concept?";
    }
    
    if (lowerMessage.includes("programming") || lowerMessage.includes("code")) {
      return "Programming is an excellent skill to develop! Start with the basics, practice coding daily, build projects, and don't be afraid to make mistakes - they're part of learning. Which programming language are you interested in?";
    }
    
    if (lowerMessage.includes("exam") || lowerMessage.includes("test")) {
      return "Exam preparation tips: 1) Start studying early, 2) Create a study plan, 3) Practice with mock tests, 4) Review your mistakes, 5) Get enough sleep before the exam. You can use our Mock Tests section to practice! Need help with any specific subject?";
    }
    
    if (lowerMessage.includes("time") || lowerMessage.includes("schedule")) {
      return "Time management is crucial for academic success! Try using our Timetable feature to organize your study schedule. Break your study sessions into focused blocks, prioritize important tasks, and don't forget to include breaks and personal time.";
    }
    
    if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety")) {
      return "I understand that studying can be stressful. Remember to take care of your mental health! Try our Mood Tracker to monitor your emotional wellness, practice breathing exercises, and don't hesitate to talk to someone if you're feeling overwhelmed. You're doing great!";
    }
    
    if (lowerMessage.includes("motivation") || lowerMessage.includes("inspire")) {
      return "You're capable of amazing things! Remember that every expert was once a beginner. Progress takes time, so be patient with yourself. Celebrate small wins, stay consistent, and keep your goals in mind. What motivates you to keep learning?";
    }
    
    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello there! I'm excited to help you with your studies today. Whether you need help with a specific subject, study tips, or just want to chat about your academic goals, I'm here for you!";
    }
    
    if (lowerMessage.includes("how are you")) {
      return "I'm doing great and ready to help! How are your studies going? Is there anything specific you'd like assistance with today?";
    }
    
    // Default response
    return "That's an interesting question! I'm here to help with your studies, provide learning tips, discuss academic topics, and support your educational journey. Could you tell me more about what you'd like to know or what subject you're working on?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      toast({
        title: "Please enter a message",
        description: "Type something before sending",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputMessage),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground">
            Your personal study companion powered by AI
          </p>
        </div>
      </div>

      <Card className="border-0 bg-gradient-card shadow-lg h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask me anything about your studies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[50px] max-h-[100px]"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}