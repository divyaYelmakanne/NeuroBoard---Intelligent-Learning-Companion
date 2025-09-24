import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Clock, Users, Star, Play, CheckCircle, ArrowLeft, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const courses = [
  {
    id: 1,
    title: "HTML Fundamentals",
    description: "Master the building blocks of web development",
    duration: "4 weeks",
    level: "Beginner",
    progress: 85,
    rating: 4.8,
    students: 1250,
    modules: [
      "Introduction to HTML",
      "HTML Structure & Tags", 
      "Forms & Input Elements",
      "Semantic HTML & Best Practices"
    ],
    content: {
      "Introduction to HTML": "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.",
      "HTML Structure & Tags": "Learn about HTML document structure, common tags like headings, paragraphs, links, images, and how to properly nest elements.",
      "Forms & Input Elements": "Master HTML forms, input types, validation, and best practices for collecting user data effectively.",
      "Semantic HTML & Best Practices": "Use semantic HTML5 elements for better accessibility, SEO, and code maintainability."
    }
  },
  {
    id: 2,
    title: "CSS Styling",
    description: "Create beautiful and responsive web designs",
    duration: "5 weeks",
    level: "Beginner",
    progress: 60,
    rating: 4.7,
    students: 980,
    modules: [
      "CSS Basics & Selectors",
      "Box Model & Layout",
      "Flexbox & Grid",
      "Animations & Transitions",
      "Responsive Design"
    ],
    content: {
      "CSS Basics & Selectors": "Learn CSS syntax, selectors, properties, and values. Understand how to target HTML elements effectively.",
      "Box Model & Layout": "Master the CSS box model, margins, padding, borders, and positioning for precise layouts.",
      "Flexbox & Grid": "Modern layout techniques using CSS Flexbox and Grid for responsive and flexible designs.",
      "Animations & Transitions": "Create smooth animations and transitions to enhance user experience.",
      "Responsive Design": "Build websites that work on all devices using media queries and responsive techniques."
    }
  },
  {
    id: 3,
    title: "JavaScript Programming",
    description: "Learn dynamic programming for interactive websites",
    duration: "8 weeks",
    level: "Intermediate",
    progress: 35,
    rating: 4.9,
    students: 2100,
    modules: [
      "JavaScript Fundamentals",
      "DOM Manipulation",
      "Event Handling",
      "Asynchronous Programming",
      "ES6+ Features",
      "Object-Oriented Programming",
      "Error Handling",
      "Modern JavaScript Tools"
    ]
  },
  {
    id: 4,
    title: "C Programming",
    description: "Foundation of system programming and algorithms",
    duration: "6 weeks",
    level: "Beginner",
    progress: 90,
    rating: 4.6,
    students: 1500,
    modules: [
      "C Basics & Syntax",
      "Data Types & Variables",
      "Control Structures",
      "Functions & Scope",
      "Pointers & Memory",
      "File Handling"
    ]
  },
  {
    id: 5,
    title: "Java Programming",
    description: "Object-oriented programming with Java",
    duration: "10 weeks",
    level: "Intermediate",
    progress: 45,
    rating: 4.8,
    students: 1800,
    modules: [
      "Java Fundamentals",
      "Object-Oriented Concepts",
      "Inheritance & Polymorphism",
      "Exception Handling",
      "Collections Framework",
      "Multithreading",
      "File I/O",
      "JDBC Basics",
      "GUI Development",
      "Design Patterns"
    ]
  },
  {
    id: 6,
    title: "Python Programming",
    description: "Versatile programming for data science and web development",
    duration: "8 weeks",
    level: "Beginner",
    progress: 75,
    rating: 4.9,
    students: 2500,
    modules: [
      "Python Basics",
      "Data Structures",
      "Functions & Modules",
      "File Handling",
      "Object-Oriented Programming",
      "Libraries & Frameworks",
      "Web Development with Flask",
      "Data Analysis Basics"
    ]
  },
  {
    id: 7,
    title: "C++ Programming",
    description: "Advanced programming with C++",
    duration: "9 weeks",
    level: "Advanced",
    progress: 20,
    rating: 4.7,
    students: 950,
    modules: [
      "C++ Fundamentals",
      "Object-Oriented Programming",
      "Templates & Generic Programming",
      "STL (Standard Template Library)",
      "Memory Management",
      "Advanced Topics",
      "Design Patterns",
      "Performance Optimization",
      "Modern C++ Features"
    ]
  },
  {
    id: 8,
    title: "Operating Systems",
    description: "Understanding how operating systems work",
    duration: "7 weeks",
    level: "Intermediate",
    progress: 55,
    rating: 4.5,
    students: 1200,
    modules: [
      "OS Introduction",
      "Process Management",
      "Memory Management",
      "File Systems",
      "I/O Systems",
      "Synchronization",
      "Deadlocks"
    ]
  },
  {
    id: 9,
    title: "Database Management Systems",
    description: "Design and manage efficient databases",
    duration: "6 weeks",
    level: "Intermediate",
    progress: 70,
    rating: 4.6,
    students: 1100,
    modules: [
      "Database Fundamentals",
      "Relational Model",
      "SQL Queries",
      "Database Design",
      "Normalization",
      "Transactions & Concurrency"
    ]
  }
];

const levelColors = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Advanced: "bg-red-100 text-red-800 border-red-200"
};

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleViewCourse = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setViewMode('detail');
  };

  const handleCompleteModule = (module: string) => {
    if (!completedModules.includes(module)) {
      setCompletedModules([...completedModules, module]);
      toast({
        title: "Module Completed! 🎉",
        description: `You've completed: ${module}`,
      });
    }
  };

  const handleCompleteCourse = () => {
    setShowCertificate(true);
    toast({
      title: "Congratulations! 🏆",
      description: `You've completed ${selectedCourse.title}!`,
    });
  };

  const generateCertificate = () => {
    const studentName = user?.name || "Student";
    const certificateContent = `
Certificate of Completion

This certifies that
${studentName}
has successfully completed the course
${selectedCourse.title}

Issued on: ${new Date().toLocaleDateString()}
Course Duration: ${selectedCourse.duration}
    `;
    
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCourse.title}_Certificate.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (viewMode === 'detail') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <Badge variant="outline" className="bg-primary/10">
            {selectedCourse.level}
          </Badge>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
              <CardDescription className="text-lg">{selectedCourse.description}</CardDescription>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{selectedCourse.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{selectedCourse.rating}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            <h3 className="text-xl font-semibold">Course Modules</h3>
            {selectedCourse.modules.map((module, index) => (
              <Card key={module} className="border-primary/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      {completedModules.includes(module) ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      Module {index + 1}: {module}
                    </h4>
                    <Button
                      variant={completedModules.includes(module) ? "secondary" : "default"}
                      onClick={() => handleCompleteModule(module)}
                      disabled={completedModules.includes(module)}
                    >
                      {completedModules.includes(module) ? "Completed" : "Mark Complete"}
                    </Button>
                  </div>
                  <p className="text-muted-foreground">
                    {selectedCourse.content?.[module] || "Course content for this module."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {completedModules.length === selectedCourse.modules.length && (
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/10">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Course Completed!</h3>
                <p className="text-muted-foreground mb-4">
                  Congratulations! You've completed all modules in this course.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={handleCompleteCourse} className="bg-green-500 hover:bg-green-600">
                    Get Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">🏆 Certificate of Completion</DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4 p-6">
              <div className="border-4 border-primary/20 rounded-lg p-6 space-y-3">
                <Award className="h-16 w-16 text-yellow-500 mx-auto" />
                <h3 className="text-lg font-semibold">Certificate of Completion</h3>
                <p className="text-sm">This certifies that</p>
                <p className="text-xl font-bold text-primary">{user?.name || "Student"}</p>
                <p className="text-sm">has successfully completed</p>
                <p className="font-semibold">{selectedCourse.title}</p>
                <p className="text-xs text-muted-foreground">
                  Issued on: {new Date().toLocaleDateString()}
                </p>
              </div>
              <Button onClick={generateCertificate} className="w-full">
                Download Certificate
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Learning Courses
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive courses to enhance your programming skills
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          {courses.length} Courses Available
        </Badge>
      </div>

      <Tabs defaultValue="all-courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-courses">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all-courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline" className={levelColors[course.level as keyof typeof levelColors]}>
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <Button className="w-full" onClick={() => handleViewCourse(course)}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.filter(course => course.progress > 0 && course.progress < 100).map((course) => (
              <Card key={course.id} className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button className="w-full mt-4">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.filter(course => course.progress === 100).map((course) => (
              <Card key={course.id} className="border-green-200 bg-green-50/50 dark:bg-green-900/10">
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="default" className="w-full justify-center">
                    ✓ Completed
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}