import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Flag, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
  subject: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete Physics Assignment",
    description: "Chapter 12 - Electromagnetic Induction problems",
    completed: false,
    priority: "high",
    dueDate: "2024-12-15",
    subject: "Physics",
  },
  {
    id: "2",
    title: "Math Practice Test",
    description: "Prepare for upcoming calculus exam",
    completed: false,
    priority: "medium",
    dueDate: "2024-12-18",
    subject: "Mathematics",
  },
  {
    id: "3",
    title: "Read English Literature",
    description: "Finish reading 'To Kill a Mockingbird' - Chapters 15-20",
    completed: true,
    priority: "low",
    dueDate: "2024-12-10",
    subject: "English",
  },
  {
    id: "4",
    title: "Chemistry Lab Report",
    description: "Write lab report for acid-base titration experiment",
    completed: false,
    priority: "high",
    dueDate: "2024-12-16",
    subject: "Chemistry",
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
    subject: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed!",
        description: task.title,
      });
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
    });
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      subject: newTask.subject,
    };
    
    setTasks([task, ...tasks]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      subject: "",
    });
    setShowAddForm(false);
    
    toast({
      title: "Task added!",
      description: "New task has been added to your list.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your study tasks and assignments
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{tasks.length}</p>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{pendingTasks.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{completedTasks.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                placeholder="Subject"
                value={newTask.subject}
                onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
              />
            </div>
            <Input
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={addTask} className="bg-gradient-primary">
                Add Task
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Tasks */}
      <Card className="border-0 bg-gradient-card shadow-lg">
        <CardHeader>
          <CardTitle>Pending Tasks ({pendingTasks.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium">{task.title}</h3>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  {task.subject && (
                    <Badge variant="outline">{task.subject}</Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {pendingTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No pending tasks. Great job! 🎉
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card className="border-0 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle>Completed Tasks ({completedTasks.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-success/10 opacity-70">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium line-through">{task.title}</h3>
                    {task.subject && (
                      <Badge variant="outline">{task.subject}</Badge>
                    )}
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-through">{task.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}