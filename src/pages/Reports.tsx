import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { TrendingUp, TrendingDown, Target, Award, AlertTriangle } from "lucide-react";

const subjectPerformance = [
  { subject: "Mathematics", current: 85, target: 90, trend: 5, grade: "A" },
  { subject: "Physics", current: 78, target: 85, trend: -2, grade: "B+" },
  { subject: "Chemistry", current: 92, target: 95, trend: 8, grade: "A+" },
  { subject: "English", current: 74, target: 80, trend: 3, grade: "B" },
  { subject: "Computer Science", current: 88, target: 90, trend: 6, grade: "A" },
  { subject: "Biology", current: 81, target: 85, trend: 1, grade: "B+" }
];

const monthlyProgress = [
  { month: "Jan", math: 75, physics: 70, chemistry: 85, english: 68, cs: 80, biology: 75 },
  { month: "Feb", math: 78, physics: 72, chemistry: 87, english: 70, cs: 82, biology: 77 },
  { month: "Mar", math: 80, physics: 75, chemistry: 89, english: 72, cs: 84, biology: 79 },
  { month: "Apr", math: 83, physics: 76, chemistry: 90, english: 74, cs: 86, biology: 80 },
  { month: "May", math: 85, physics: 78, chemistry: 92, english: 74, cs: 88, biology: 81 }
];

const gradeDistribution = [
  { name: "A+", value: 2, color: "hsl(var(--primary))" },
  { name: "A", value: 2, color: "hsl(var(--primary-glow))" },
  { name: "B+", value: 2, color: "hsl(var(--accent))" },
  { name: "B", value: 1, color: "hsl(var(--muted))" }
];

const skillRadarData = [
  { skill: "Problem Solving", score: 85 },
  { skill: "Critical Thinking", score: 78 },
  { skill: "Communication", score: 74 },
  { skill: "Teamwork", score: 82 },
  { skill: "Creativity", score: 88 },
  { skill: "Time Management", score: 75 }
];

export default function Reports() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Performance Reports
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analysis of your academic progress and achievements
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          Overall GPA: 3.7
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="trends">Progress Trends</TabsTrigger>
          <TabsTrigger value="skills">Skill Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">83.2%</div>
                <p className="text-xs text-green-600">+2.5% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subjects Above Target</CardTitle>
                <Target className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4/6</div>
                <p className="text-xs text-blue-600">66.7% success rate</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-purple-600">New badges earned</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Areas for Improvement</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-orange-600">Physics & English</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Your current grade breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Overview</CardTitle>
                <CardDescription>Current scores vs targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="hsl(var(--primary))" name="Current Score" />
                    <Bar dataKey="target" fill="hsl(var(--primary-glow))" name="Target Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectPerformance.map((subject) => (
              <Card key={subject.subject} className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{subject.subject}</CardTitle>
                    <Badge variant={subject.grade.includes('+') ? 'default' : 'secondary'}>
                      {subject.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Score</span>
                      <span className="font-medium">{subject.current}%</span>
                    </div>
                    <Progress value={subject.current} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target Score</span>
                      <span className="font-medium">{subject.target}%</span>
                    </div>
                    <Progress value={subject.target} className="h-2 opacity-50" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Trend</span>
                    <div className={`flex items-center gap-1 text-sm ${
                      subject.trend > 0 ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {subject.trend > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(subject.trend)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Trends</CardTitle>
              <CardDescription>Track your performance over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="math" stroke="hsl(var(--primary))" strokeWidth={2} name="Mathematics" />
                  <Line type="monotone" dataKey="physics" stroke="hsl(var(--secondary))" strokeWidth={2} name="Physics" />
                  <Line type="monotone" dataKey="chemistry" stroke="hsl(var(--accent))" strokeWidth={2} name="Chemistry" />
                  <Line type="monotone" dataKey="english" stroke="hsl(var(--muted-foreground))" strokeWidth={2} name="English" />
                  <Line type="monotone" dataKey="cs" stroke="hsl(var(--primary-glow))" strokeWidth={2} name="Computer Science" />
                  <Line type="monotone" dataKey="biology" stroke="hsl(var(--destructive))" strokeWidth={2} name="Biology" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Assessment</CardTitle>
              <CardDescription>Comprehensive evaluation of your core competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}