import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  CheckSquare,
  Brain,
  Target,
  Award,
  Clock,
  BookOpen,
  Heart,
} from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const performanceData = [
  { month: "Jan", mathematics: 85, physics: 78, chemistry: 82, english: 88 },
  { month: "Feb", mathematics: 88, physics: 82, chemistry: 85, english: 90 },
  { month: "Mar", mathematics: 92, physics: 85, chemistry: 88, english: 87 },
  { month: "Apr", mathematics: 89, physics: 88, chemistry: 91, english: 92 },
  { month: "May", mathematics: 94, physics: 91, chemistry: 89, english: 89 },
];

const subjectData = [
  { subject: "Mathematics", score: 94, color: "#6366f1" },
  { subject: "Physics", score: 91, color: "#f59e0b" },
  { subject: "Chemistry", score: 89, color: "#10b981" },
  { subject: "English", score: 89, color: "#ef4444" },
];

const moodData = [
  { name: "Happy", value: 40, color: "#10b981" },
  { name: "Neutral", value: 25, color: "#6b7280" },
  { name: "Focused", value: 20, color: "#6366f1" },
  { name: "Stressed", value: 15, color: "#ef4444" },
];

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h1>
            <p className="text-white/90">Here's your learning progress overview</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Overall Grade</p>
            <p className="text-4xl font-bold">A-</p>
            <p className="text-sm text-white/80">90.5% Average</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <p className="text-2xl font-bold">12/15</p>
                <Progress value={80} className="mt-2" />
              </div>
              <CheckSquare className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Study Hours</p>
                <p className="text-2xl font-bold">32h</p>
                <p className="text-xs text-success">+5h this week</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Tests</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-warning">Next: Physics</p>
              </div>
              <BookOpen className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mood Score</p>
                <p className="text-2xl font-bold">8.2/10</p>
                <p className="text-xs text-success">Feeling good!</p>
              </div>
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mathematics" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="physics" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="chemistry" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="english" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="border-0 bg-gradient-card shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Award className="h-5 w-5 text-success" />
              <div className="flex-1">
                <p className="font-medium">Completed Physics Quiz</p>
                <p className="text-sm text-muted-foreground">Scored 95% - Excellent work!</p>
              </div>
              <Badge variant="secondary">2h ago</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Target className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Study Goal Achieved</p>
                <p className="text-sm text-muted-foreground">Completed daily 4-hour study target</p>
              </div>
              <Badge variant="secondary">5h ago</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <BookOpen className="h-5 w-5 text-secondary" />
              <div className="flex-1">
                <p className="font-medium">New Course Started</p>
                <p className="text-sm text-muted-foreground">Began JavaScript Programming course</p>
              </div>
              <Badge variant="secondary">1d ago</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mood Distribution */}
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-pink-500" />
              Mood This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={moodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {moodData.map((mood, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: mood.color }}
                    />
                    <span>{mood.name}</span>
                  </div>
                  <span className="font-medium">{mood.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}