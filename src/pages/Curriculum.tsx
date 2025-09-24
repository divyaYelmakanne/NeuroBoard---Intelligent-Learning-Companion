import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Circle, Clock, Target, TrendingUp, Book, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const subjectProgress = [
  {
    subject: "Mathematics",
    totalTopics: 25,
    completedTopics: 18,
    progress: 72,
    chapters: [
      { name: "Algebra", topics: 8, completed: 6, difficulty: "Medium" },
      { name: "Geometry", topics: 7, completed: 5, difficulty: "Hard" },
      { name: "Trigonometry", topics: 6, completed: 4, difficulty: "Medium" },
      { name: "Calculus", topics: 4, completed: 3, difficulty: "Hard" }
    ]
  },
  {
    subject: "Physics",
    totalTopics: 20,
    completedTopics: 14,
    progress: 70,
    chapters: [
      { name: "Mechanics", topics: 6, completed: 5, difficulty: "Medium" },
      { name: "Thermodynamics", topics: 5, completed: 4, difficulty: "Hard" },
      { name: "Waves", topics: 4, completed: 3, difficulty: "Medium" },
      { name: "Electromagnetism", topics: 5, completed: 2, difficulty: "Hard" }
    ]
  },
  {
    subject: "Chemistry",
    totalTopics: 22,
    completedTopics: 20,
    progress: 91,
    chapters: [
      { name: "Organic Chemistry", topics: 8, completed: 7, difficulty: "Hard" },
      { name: "Inorganic Chemistry", topics: 6, completed: 6, difficulty: "Medium" },
      { name: "Physical Chemistry", topics: 5, completed: 4, difficulty: "Hard" },
      { name: "Environmental Chemistry", topics: 3, completed: 3, difficulty: "Easy" }
    ]
  },
  {
    subject: "English",
    totalTopics: 15,
    completedTopics: 11,
    progress: 73,
    chapters: [
      { name: "Literature", topics: 5, completed: 4, difficulty: "Medium" },
      { name: "Grammar", topics: 4, completed: 3, difficulty: "Easy" },
      { name: "Composition", topics: 3, completed: 2, difficulty: "Medium" },
      { name: "Poetry", topics: 3, completed: 2, difficulty: "Hard" }
    ]
  },
  {
    subject: "Computer Science",
    totalTopics: 18,
    completedTopics: 16,
    progress: 89,
    chapters: [
      { name: "Programming Fundamentals", topics: 6, completed: 6, difficulty: "Medium" },
      { name: "Data Structures", topics: 5, completed: 4, difficulty: "Hard" },
      { name: "Algorithms", topics: 4, completed: 3, difficulty: "Hard" },
      { name: "Database Systems", topics: 3, completed: 3, difficulty: "Medium" }
    ]
  },
  {
    subject: "Biology",
    totalTopics: 24,
    completedTopics: 19,
    progress: 79,
    chapters: [
      { name: "Cell Biology", topics: 6, completed: 5, difficulty: "Medium" },
      { name: "Genetics", topics: 5, completed: 4, difficulty: "Hard" },
      { name: "Evolution", topics: 4, completed: 4, difficulty: "Medium" },
      { name: "Ecology", topics: 5, completed: 3, difficulty: "Easy" },
      { name: "Human Physiology", topics: 4, completed: 3, difficulty: "Hard" }
    ]
  }
];

const progressData = subjectProgress.map(subject => ({
  subject: subject.subject,
  completed: subject.completedTopics,
  remaining: subject.totalTopics - subject.completedTopics
}));

const difficultyColors = {
  Easy: "#10B981",
  Medium: "#F59E0B", 
  Hard: "#EF4444"
};

const overallStats = {
  totalTopics: subjectProgress.reduce((sum, subject) => sum + subject.totalTopics, 0),
  completedTopics: subjectProgress.reduce((sum, subject) => sum + subject.completedTopics, 0),
  averageProgress: Math.round(subjectProgress.reduce((sum, subject) => sum + subject.progress, 0) / subjectProgress.length)
};

export default function Curriculum() {
  const [selectedSubject, setSelectedSubject] = useState(subjectProgress[0]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Curriculum Analyzer
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your academic progress and analyze curriculum completion
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          {overallStats.averageProgress}% Overall Progress
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Progress Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Topics</CardTitle>
                <Book className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.totalTopics}</div>
                <p className="text-xs text-muted-foreground">Across all subjects</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.completedTopics}</div>
                <p className="text-xs text-green-600">
                  {Math.round((overallStats.completedTopics / overallStats.totalTopics) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.totalTopics - overallStats.completedTopics}</div>
                <p className="text-xs text-orange-600">Topics to complete</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectProgress.map((subject) => (
              <Card key={subject.subject} className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{subject.subject}</CardTitle>
                    <Badge variant="outline">
                      {subject.completedTopics}/{subject.totalTopics}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Chapters</h4>
                    {subject.chapters.map((chapter, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2">
                          {chapter.completed === chapter.topics ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <Circle className="h-3 w-3 text-muted-foreground" />
                          )}
                          {chapter.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span>{chapter.completed}/{chapter.topics}</span>
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{ 
                              borderColor: difficultyColors[chapter.difficulty as keyof typeof difficultyColors],
                              color: difficultyColors[chapter.difficulty as keyof typeof difficultyColors]
                            }}
                          >
                            {chapter.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subjects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {subjectProgress.map((subject) => (
                  <Button
                    key={subject.subject}
                    variant={selectedSubject.subject === subject.subject ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject.subject}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedSubject.subject}</CardTitle>
                      <CardDescription>
                        {selectedSubject.completedTopics} of {selectedSubject.totalTopics} topics completed
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-primary/10">
                      {selectedSubject.progress}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={selectedSubject.progress} className="h-3 mb-6" />
                  
                  <Accordion type="single" collapsible className="w-full">
                    {selectedSubject.chapters.map((chapter, index) => (
                      <AccordionItem key={index} value={`chapter-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div className="flex items-center gap-2">
                              {chapter.completed === chapter.topics ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span>{chapter.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{chapter.completed}/{chapter.topics}</Badge>
                              <Badge 
                                variant="outline"
                                style={{ 
                                  borderColor: difficultyColors[chapter.difficulty as keyof typeof difficultyColors],
                                  color: difficultyColors[chapter.difficulty as keyof typeof difficultyColors]
                                }}
                              >
                                {chapter.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-medium mb-2">Chapter Progress</h5>
                                <Progress 
                                  value={(chapter.completed / chapter.topics) * 100} 
                                  className="h-2" 
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                  {Math.round((chapter.completed / chapter.topics) * 100)}% completed
                                </p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2">Difficulty Level</h5>
                                <Badge 
                                  className="px-3 py-1"
                                  style={{ 
                                    backgroundColor: difficultyColors[chapter.difficulty as keyof typeof difficultyColors],
                                    color: 'white'
                                  }}
                                >
                                  {chapter.difficulty}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <h5 className="font-medium mb-2">Topic Status</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Array.from({ length: chapter.topics }, (_, topicIndex) => (
                                  <div key={topicIndex} className="flex items-center gap-2 text-sm">
                                    {topicIndex < chapter.completed ? (
                                      <CheckCircle className="h-3 w-3 text-green-600" />
                                    ) : (
                                      <Circle className="h-3 w-3 text-muted-foreground" />
                                    )}
                                    <span>Topic {topicIndex + 1}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress Comparison</CardTitle>
                <CardDescription>Topics completed vs remaining by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" stackId="a" fill="hsl(var(--primary))" name="Completed" />
                    <Bar dataKey="remaining" stackId="a" fill="hsl(var(--muted))" name="Remaining" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Progress Distribution</CardTitle>
                <CardDescription>Completion status across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Completed", value: overallStats.completedTopics, fill: "hsl(var(--primary))" },
                        { name: "Remaining", value: overallStats.totalTopics - overallStats.completedTopics, fill: "hsl(var(--muted))" }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Curriculum Insights</CardTitle>
              <CardDescription>AI-powered analysis of your learning progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Strengths</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Excellent progress in Chemistry (91%)</li>
                    <li>• Strong performance in Computer Science (89%)</li>
                    <li>• Consistent completion rate across subjects</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Areas for Improvement</h4>
                  <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                    <li>• Focus on Physics Electromagnetism</li>
                    <li>• Complete remaining Math Calculus topics</li>
                    <li>• Review English Poetry concepts</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Recommendations</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Allocate more study time to Physics (currently at 70%)</li>
                  <li>• Consider forming study groups for difficult topics</li>
                  <li>• Schedule regular review sessions for completed topics</li>
                  <li>• Set weekly targets to maintain consistent progress</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}