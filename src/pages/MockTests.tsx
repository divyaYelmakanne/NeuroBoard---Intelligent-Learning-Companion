import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, CheckCircle, Trophy, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TestInterface from "@/components/TestInterface";
import { mockTestQuestions } from "@/data/mockTestQuestions";

const mockTests = [
  {
    id: 1,
    subject: "HTML",
    title: "HTML Fundamentals Test",
    questions: 20,
    duration: 30,
    difficulty: "Easy",
    description: "Test your knowledge of HTML basics, tags, and structure",
    completed: false,
    score: null
  },
  {
    id: 2,
    subject: "CSS",
    title: "CSS Styling & Layout",
    questions: 20,
    duration: 35,
    difficulty: "Medium",
    description: "CSS selectors, properties, flexbox, and responsive design",
    completed: false,
    score: null
  },
  {
    id: 3,
    subject: "JavaScript",
    title: "JavaScript Programming",
    questions: 20,
    duration: 40,
    difficulty: "Medium",
    description: "Variables, functions, DOM manipulation, and events",
    completed: false,
    score: null
  },
  {
    id: 4,
    subject: "C Programming",
    title: "C Language Basics",
    questions: 20,
    duration: 45,
    difficulty: "Medium",
    description: "Syntax, data types, functions, and memory management",
    completed: false,
    score: null
  },
  {
    id: 5,
    subject: "Java",
    title: "Java Object-Oriented Programming",
    questions: 20,
    duration: 50,
    difficulty: "Hard",
    description: "Classes, inheritance, polymorphism, and collections",
    completed: false,
    score: null
  },
  {
    id: 6,
    subject: "Python",
    title: "Python Programming Essentials",
    questions: 20,
    duration: 40,
    difficulty: "Medium",
    description: "Syntax, data structures, functions, and libraries",
    completed: false,
    score: null
  },
  {
    id: 7,
    subject: "Operating Systems",
    title: "OS Concepts & Processes",
    questions: 20,
    duration: 35,
    difficulty: "Hard",
    description: "Process management, memory, file systems, and scheduling",
    completed: false,
    score: null
  },
  {
    id: 8,
    subject: "DBMS",
    title: "Database Management Systems",
    questions: 20,
    duration: 40,
    difficulty: "Hard",
    description: "SQL queries, normalization, transactions, and indexing",
    completed: false,
    score: null
  }
];

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  Hard: "bg-red-100 text-red-800 border-red-200"
};

export default function MockTests() {
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [completedTestIds, setCompletedTestIds] = useState<number[]>([]); // No completed tests initially
  const [testScores, setTestScores] = useState<{[key: number]: number}>({}); // No scores initially
  const { toast } = useToast();

  const startTest = (test: any) => {
    const testData = mockTestQuestions[test.id as keyof typeof mockTestQuestions];
    if (testData) {
      setSelectedTest(testData);
      setIsTestStarted(true);
      toast({
        title: "Test Started",
        description: `${test.title} has begun. Good luck!`
      });
    }
  };

  const handleTestComplete = (score: number, answers: number[]) => {
    if (selectedTest) {
      setCompletedTestIds([...completedTestIds, selectedTest.id]);
      setTestScores({...testScores, [selectedTest.id]: score});
      
      // Update the mock test data
      const testIndex = mockTests.findIndex(test => test.id === selectedTest.id);
      if (testIndex !== -1) {
        mockTests[testIndex].completed = true;
        mockTests[testIndex].score = score;
      }
    }
  };

  const handleExitTest = () => {
    setIsTestStarted(false);
    setSelectedTest(null);
  };

  // Update mock tests with current completion status
  const updatedMockTests = mockTests.map(test => ({
    ...test,
    completed: completedTestIds.includes(test.id),
    score: testScores[test.id] || null
  }));

  const completedTests = updatedMockTests.filter(test => test.completed);
  const averageScore = completedTests.length > 0 
    ? Math.round(completedTests.reduce((sum, test) => sum + (test.score || 0), 0) / completedTests.length)
    : 0;

  if (isTestStarted && selectedTest) {
    return (
      <TestInterface 
        testData={selectedTest}
        onComplete={handleTestComplete}
        onExit={handleExitTest}
      />
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Mock Tests
          </h1>
          <p className="text-muted-foreground mt-2">
            Practice tests to assess your knowledge and skills
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          {completedTests.length}/{updatedMockTests.length} Completed
        </Badge>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{updatedMockTests.length}</div>
            <p className="text-xs text-muted-foreground">Available tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTests.length}</div>
            <p className="text-xs text-green-600">Tests finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTests.length > 0 ? Math.max(...completedTests.map(t => t.score || 0)) : 0}%
            </div>
            <p className="text-xs text-yellow-600">Highest achievement</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {updatedMockTests.map((test) => (
          <Card key={test.id} className={`border-primary/20 ${test.completed ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{test.subject}</CardTitle>
                {test.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>
              <CardDescription>{test.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{test.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span>{test.questions} questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{test.duration} mins</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className={difficultyColors[test.difficulty as keyof typeof difficultyColors]}>
                  {test.difficulty}
                </Badge>
                {test.completed && (
                  <Badge variant="default">Score: {test.score}%</Badge>
                )}
              </div>

              <Button 
                className="w-full" 
                onClick={() => startTest(test)}
                disabled={test.completed}
              >
                {test.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Test
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}