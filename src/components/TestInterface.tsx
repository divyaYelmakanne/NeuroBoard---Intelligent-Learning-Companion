import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, Trophy, RotateCcw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import jsPDF from "jspdf";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TestData {
  id: number;
  subject: string;
  title: string;
  questions: Question[];
  duration: number;
}

interface TestInterfaceProps {
  testData: TestData;
  onComplete: (score: number, answers: number[]) => void;
  onExit: () => void;
}

export default function TestInterface({ testData, onComplete, onExit }: TestInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(testData.questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(testData.duration * 60); // Convert minutes to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    testData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / testData.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    
    toast({
      title: "Test Submitted",
      description: `You scored ${finalScore}% (${correctAnswers}/${testData.questions.length} correct)`
    });

    onComplete(finalScore, answers);
  };

  const generateCertificate = () => {
    const doc = new jsPDF();
    
    // Set up the certificate
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Border
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(3);
    doc.rect(10, 10, 190, 277);
    
    // Inner border
    doc.setLineWidth(1);
    doc.rect(15, 15, 180, 267);
    
    // Title
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.text("Certificate of Achievement", 105, 50, { align: "center" });
    
    // Subtitle
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("This is to certify that", 105, 70, { align: "center" });
    
    // Student name
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(user?.name || "Student", 105, 95, { align: "center" });
    
    // Achievement text
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("has successfully completed the", 105, 115, { align: "center" });
    
    // Test name
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.text(testData.title, 105, 135, { align: "center" });
    
    // Score
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 150, 0);
    doc.text(`with a score of ${score}%`, 105, 155, { align: "center" });
    
    // Date
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 180, { align: "center" });
    
    // Performance badge
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    if (score >= 80) {
      doc.setTextColor(255, 215, 0);
      doc.text("🏆 EXCELLENT PERFORMANCE", 105, 200, { align: "center" });
    } else if (score >= 60) {
      doc.setTextColor(0, 150, 0);
      doc.text("✓ GOOD PERFORMANCE", 105, 200, { align: "center" });
    } else {
      doc.setTextColor(255, 140, 0);
      doc.text("📚 KEEP PRACTICING", 105, 200, { align: "center" });
    }
    
    // Footer
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("Learning Management System", 105, 250, { align: "center" });
    
    // Save the PDF
    doc.save(`${testData.subject}_Certificate_${user?.name?.replace(/\s+/g, '_') || 'Student'}.pdf`);
    
    toast({
      title: "Certificate Generated",
      description: "Your certificate has been downloaded successfully!"
    });
  };

  const answeredQuestions = answers.filter(answer => answer !== -1).length;
  const progress = (answeredQuestions / testData.questions.length) * 100;

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {score >= 80 ? (
                <Trophy className="h-16 w-16 text-yellow-500" />
              ) : score >= 60 ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-2xl">Test Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">{score}%</div>
              <p className="text-lg text-muted-foreground">
                You got {testData.questions.filter((q, i) => answers[i] === q.correctAnswer).length} out of {testData.questions.length} questions correct
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {testData.questions.filter((q, i) => answers[i] === q.correctAnswer).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {testData.questions.filter((q, i) => answers[i] !== q.correctAnswer).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
              </div>

              <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"} className="text-lg px-4 py-2">
                {score >= 80 ? "Excellent!" : score >= 60 ? "Good Job!" : "Keep Practicing!"}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateCertificate} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              <Button onClick={onExit} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Back to Tests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{testData.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {testData.questions.length}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-500' : ''}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Badge variant="outline">
                  {answeredQuestions}/{testData.questions.length} Answered
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {testData.questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testData.questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={answers[currentQuestion] === index ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onExit}>
                  Exit Test
                </Button>
                <Button onClick={handleSubmit} variant="destructive">
                  Submit Test
                </Button>
              </div>

              <Button
                onClick={handleNext}
                disabled={currentQuestion === testData.questions.length - 1}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {testData.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={
                    index === currentQuestion 
                      ? "default" 
                      : answers[index] !== -1 
                        ? "secondary" 
                        : "outline"
                  }
                  size="sm"
                  className="aspect-square"
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}