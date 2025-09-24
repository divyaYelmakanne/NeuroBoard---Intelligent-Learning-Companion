import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, TrendingUp, MessageSquare, Lightbulb, Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const moodEmojis = [
  { emoji: "😊", name: "Happy", value: 9 },
  { emoji: "😢", name: "Sad", value: 3 },
  { emoji: "😥", name: "Stressed", value: 2 },
  { emoji: "🤩", name: "Excited", value: 8 },
  { emoji: "😐", name: "Neutral", value: 5 },
  { emoji: "😴", name: "Sleepy", value: 4 },
  { emoji: "😎", name: "Confident", value: 8 },
  { emoji: "🤔", name: "Thinking", value: 6 },
  { emoji: "🥱", name: "Bored", value: 3 },
  { emoji: "🤒", name: "Sick", value: 2 },
  { emoji: "😭", name: "Crying", value: 1 },
  { emoji: "🤗", name: "Grateful", value: 9 },
  { emoji: "😬", name: "Nervous", value: 4 },
  { emoji: "😇", name: "Peaceful", value: 8 },
  { emoji: "😏", name: "Mischievous", value: 7 },
  { emoji: "🤯", name: "Shocked", value: 5 },
  { emoji: "😌", name: "Calm", value: 7 },
];

const moodData = [
  { date: "Mon", mood: 7, energy: 6 },
  { date: "Tue", mood: 8, energy: 7 },
  { date: "Wed", mood: 6, energy: 5 },
  { date: "Thu", mood: 9, energy: 8 },
  { date: "Fri", mood: 7, energy: 6 },
  { date: "Sat", mood: 8, energy: 9 },
  { date: "Sun", mood: 6, energy: 7 },
];

const motivationalQuotes = [
  "You are capable of amazing things! 🌟",
  "Every expert was once a beginner. Keep going! 💪",
  "Your hard work will pay off. Stay consistent! 🎯",
  "Believe in yourself and all that you are! ✨",
  "Progress, not perfection. You're doing great! 🚀",
];

const breathingExercises = [
  {
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8",
    steps: [
      { phase: "Inhale", duration: 4, instruction: "Breathe in slowly through your nose" },
      { phase: "Hold", duration: 7, instruction: "Hold your breath" },
      { phase: "Exhale", duration: 8, instruction: "Exhale completely through your mouth" }
    ]
  },
  {
    name: "Box Breathing",
    description: "Inhale for 4, hold for 4, exhale for 4, hold for 4",
    steps: [
      { phase: "Inhale", duration: 4, instruction: "Breathe in slowly" },
      { phase: "Hold", duration: 4, instruction: "Hold your breath" },
      { phase: "Exhale", duration: 4, instruction: "Breathe out slowly" },
      { phase: "Hold", duration: 4, instruction: "Hold empty" }
    ]
  },
  {
    name: "Equal Breathing",
    description: "Inhale for 4, exhale for 4",
    steps: [
      { phase: "Inhale", duration: 4, instruction: "Breathe in steadily" },
      { phase: "Exhale", duration: 4, instruction: "Breathe out steadily" }
    ]
  }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{content: string, role: 'user' | 'assistant'}>>([
    { content: "I noticed you've been feeling great this week! Your mood has been consistently positive. Would you like to share what's been working well for you? I'm here to listen and support you! 😊", role: 'assistant' }
  ]);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(breathingExercises[0]);
  const [exerciseState, setExerciseState] = useState<{
    isActive: boolean;
    currentStep: number;
    currentCount: number;
    cycle: number;
  }>({
    isActive: false,
    currentStep: 0,
    currentCount: 0,
    cycle: 1
  });
  const { toast } = useToast();

  const handleMoodSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    const mood = moodEmojis.find(m => m.name === selectedMood);
    toast({
      title: "Mood logged! " + mood?.emoji,
      description: `You're feeling ${selectedMood}. Keep track of your emotional wellness!`,
    });

    setSelectedMood(null);
    setMoodNote("");
  };

  const currentQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return;

    const userMessage = { content: chatMessage, role: 'user' as const };
    setChatHistory(prev => [...prev, userMessage]);

    // Generate AI response based on mood and message
    const generateMoodResponse = (message: string) => {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
        return "I understand you're going through a tough time. It's okay to feel sad sometimes - it's a normal human emotion. Remember that this feeling is temporary. Would you like to try a breathing exercise or talk about what's bothering you? I'm here to support you. 💙";
      } else if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('anxious')) {
        return "Stress can be really challenging. Let's take a moment to breathe together. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. Remember to break big tasks into smaller, manageable steps. You've got this! 🌟";
      } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
        return "That's wonderful to hear! I'm so glad you're feeling positive. When we feel good, it's a great time to appreciate the moment and maybe spread some of that positivity to others. What's making you feel so great today? ✨";
      } else if (lowerMessage.includes('tired') || lowerMessage.includes('sleepy') || lowerMessage.includes('exhausted')) {
        return "It sounds like you need some rest. Make sure you're getting enough sleep - it's crucial for both physical and mental health. Try to establish a bedtime routine and limit screen time before bed. Your well-being is important! 😴";
      } else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
        return "I can sense your frustration. It's normal to feel angry sometimes, but let's find healthy ways to process these feelings. Try taking deep breaths, going for a walk, or writing down your thoughts. What's causing these feelings? 💚";
      } else {
        return "Thank you for sharing with me. I'm here to listen and support you through whatever you're experiencing. Your feelings are valid, and it's important to acknowledge them. How can I help you feel better today? Remember, you're not alone in this journey. 🤗";
      }
    };

    setTimeout(() => {
      const aiResponse = { content: generateMoodResponse(chatMessage), role: 'assistant' as const };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);

    setChatMessage("");
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (exerciseState.isActive) {
      interval = setInterval(() => {
        setExerciseState(prev => {
          const currentStep = currentExercise.steps[prev.currentStep];
          
          if (prev.currentCount >= currentStep.duration) {
            // Move to next step
            const nextStepIndex = (prev.currentStep + 1) % currentExercise.steps.length;
            const nextCycle = nextStepIndex === 0 ? prev.cycle + 1 : prev.cycle;
            
            if (nextCycle > 5) {
              // Complete exercise after 5 cycles
              toast({
                title: "Exercise Complete! 🧘‍♀️",
                description: "Great job! You've completed the breathing exercise.",
              });
              return {
                isActive: false,
                currentStep: 0,
                currentCount: 0,
                cycle: 1
              };
            }
            
            return {
              ...prev,
              currentStep: nextStepIndex,
              currentCount: 0,
              cycle: nextCycle
            };
          } else {
            return {
              ...prev,
              currentCount: prev.currentCount + 1
            };
          }
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [exerciseState.isActive, currentExercise, toast]);

  const startBreathingExercise = () => {
    const randomExercise = breathingExercises[Math.floor(Math.random() * breathingExercises.length)];
    setCurrentExercise(randomExercise);
    setShowBreathingExercise(true);
  };

  const toggleExercise = () => {
    setExerciseState(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const resetExercise = () => {
    setExerciseState({
      isActive: false,
      currentStep: 0,
      currentCount: 0,
      cycle: 1
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="w-8 h-8 text-pink-500" />
            Mood Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your emotional wellness and get personalized support
          </p>
        </div>
      </div>

      {/* Daily Check-in */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {moodEmojis.map((mood) => (
                <Button
                  key={mood.name}
                  variant={selectedMood === mood.name ? "default" : "outline"}
                  className={`h-auto py-3 flex flex-col gap-1 ${
                    selectedMood === mood.name ? "bg-primary" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.name)}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-xs">{mood.name}</span>
                </Button>
              ))}
            </div>
            
            <Textarea
              placeholder="Add a note about your mood (optional)..."
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              className="min-h-[80px]"
            />
            
            <Button 
              onClick={handleMoodSubmit}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Log Mood
            </Button>
          </CardContent>
        </Card>

        {/* Mood Calendar */}
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle>Mood Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Mood Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle>Energy Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="energy" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Support Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-secondary shadow-lg text-secondary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Daily Motivation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium mb-4">{currentQuote}</p>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Keep going! You've got this! 💪
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-success shadow-lg text-success-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Breathing Exercise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium mb-4">{currentExercise.description}</p>
            <Button 
              variant="secondary" 
              className="bg-white/20 text-white hover:bg-white/30"
              onClick={startBreathingExercise}
            >
              Start Exercise
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Chat Section */}
      <Card className="border-0 bg-gradient-card shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            AI Mood Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-3">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`rounded-lg p-4 ${chat.role === 'assistant' ? 'bg-muted/50' : 'bg-primary/10'}`}>
                <p className="text-sm text-muted-foreground mb-2">
                  {chat.role === 'assistant' ? 'AI Assistant:' : 'You:'}
                </p>
                <p className="text-sm">{chat.content}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder="How are you feeling? Tell me about your day..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSubmit();
                }
              }}
            />
            <Button 
              className="bg-gradient-primary"
              onClick={handleChatSubmit}
              disabled={!chatMessage.trim()}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Breathing Exercise Modal */}
      <Dialog open={showBreathingExercise} onOpenChange={setShowBreathingExercise}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">🧘‍♀️ {currentExercise.name}</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6 p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{currentExercise.description}</p>
              <Badge variant="outline">Cycle {exerciseState.cycle} of 5</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/20 flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {currentExercise.steps[exerciseState.currentStep].duration - exerciseState.currentCount}
                  </div>
                  <div className="text-sm text-muted-foreground">seconds</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">
                  {currentExercise.steps[exerciseState.currentStep].phase}
                </h3>
                <p className="text-muted-foreground">
                  {currentExercise.steps[exerciseState.currentStep].instruction}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center gap-3">
              <Button
                onClick={toggleExercise}
                variant={exerciseState.isActive ? "secondary" : "default"}
                className="flex items-center gap-2"
              >
                {exerciseState.isActive ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start
                  </>
                )}
              </Button>
              <Button onClick={resetExercise} variant="outline">
                Reset
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}