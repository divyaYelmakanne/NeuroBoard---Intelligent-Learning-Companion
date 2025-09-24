import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, Save, Plus, Trash2, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
  "18:00", "19:00", "20:00", "21:00", "22:00"
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const subjectColors = {
  "Mathematics": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200",
  "Physics": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200",
  "Chemistry": "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200",
  "English": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
  "Computer Science": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200",
  "Biology": "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-200",
  "Break": "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200",
  "Free Time": "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200"
};

const initialTimetable = {
  "Monday": {
    "07:00": { subject: "Mathematics", topic: "Algebra", type: "Study" },
    "08:00": { subject: "Mathematics", topic: "Problem Solving", type: "Practice" },
    "09:00": { subject: "Break", topic: "Breakfast", type: "Break" },
    "10:00": { subject: "Physics", topic: "Mechanics", type: "Study" },
    "11:00": { subject: "Physics", topic: "Numerical Problems", type: "Practice" },
    "12:00": { subject: "Break", topic: "Lunch", type: "Break" },
    "14:00": { subject: "Chemistry", topic: "Organic Chemistry", type: "Study" },
    "15:00": { subject: "Chemistry", topic: "Lab Practice", type: "Practice" },
    "16:00": { subject: "Break", topic: "Snack Break", type: "Break" },
    "17:00": { subject: "English", topic: "Literature", type: "Study" },
    "18:00": { subject: "English", topic: "Writing Practice", type: "Practice" },
    "19:00": { subject: "Free Time", topic: "Recreation", type: "Break" }
  },
  "Tuesday": {
    "07:00": { subject: "Computer Science", topic: "Programming", type: "Study" },
    "08:00": { subject: "Computer Science", topic: "Coding Practice", type: "Practice" },
    "09:00": { subject: "Break", topic: "Breakfast", type: "Break" },
    "10:00": { subject: "Biology", topic: "Cell Biology", type: "Study" },
    "11:00": { subject: "Biology", topic: "Diagrams", type: "Practice" },
    "12:00": { subject: "Break", topic: "Lunch", type: "Break" },
    "14:00": { subject: "Mathematics", topic: "Geometry", type: "Study" },
    "15:00": { subject: "Mathematics", topic: "Problem Solving", type: "Practice" },
    "16:00": { subject: "Break", topic: "Snack Break", type: "Break" },
    "17:00": { subject: "Physics", topic: "Thermodynamics", type: "Study" },
    "18:00": { subject: "Physics", topic: "Numerical Problems", type: "Practice" },
    "19:00": { subject: "Free Time", topic: "Recreation", type: "Break" }
  },
  "Wednesday": {
    "07:00": { subject: "English", topic: "Grammar", type: "Study" },
    "08:00": { subject: "English", topic: "Essay Writing", type: "Practice" },
    "09:00": { subject: "Break", topic: "Breakfast", type: "Break" },
    "10:00": { subject: "Chemistry", topic: "Inorganic Chemistry", type: "Study" },
    "11:00": { subject: "Chemistry", topic: "Reactions", type: "Practice" },
    "12:00": { subject: "Break", topic: "Lunch", type: "Break" },
    "14:00": { subject: "Biology", topic: "Genetics", type: "Study" },
    "15:00": { subject: "Biology", topic: "Case Studies", type: "Practice" },
    "16:00": { subject: "Break", topic: "Snack Break", type: "Break" },
    "17:00": { subject: "Computer Science", topic: "Data Structures", type: "Study" },
    "18:00": { subject: "Computer Science", topic: "Implementation", type: "Practice" },
    "19:00": { subject: "Free Time", topic: "Recreation", type: "Break" }
  },
  "Thursday": {
    "07:00": { subject: "Physics", topic: "Waves", type: "Study" },
    "08:00": { subject: "Physics", topic: "Experiments", type: "Practice" },
    "09:00": { subject: "Break", topic: "Breakfast", type: "Break" },
    "10:00": { subject: "Mathematics", topic: "Trigonometry", type: "Study" },
    "11:00": { subject: "Mathematics", topic: "Problem Solving", type: "Practice" },
    "12:00": { subject: "Break", topic: "Lunch", type: "Break" },
    "14:00": { subject: "English", topic: "Poetry", type: "Study" },
    "15:00": { subject: "English", topic: "Analysis", type: "Practice" },
    "16:00": { subject: "Break", topic: "Snack Break", type: "Break" },
    "17:00": { subject: "Chemistry", topic: "Physical Chemistry", type: "Study" },
    "18:00": { subject: "Chemistry", topic: "Calculations", type: "Practice" },
    "19:00": { subject: "Free Time", topic: "Recreation", type: "Break" }
  },
  "Friday": {
    "07:00": { subject: "Biology", topic: "Evolution", type: "Study" },
    "08:00": { subject: "Biology", topic: "Practical Work", type: "Practice" },
    "09:00": { subject: "Break", topic: "Breakfast", type: "Break" },
    "10:00": { subject: "Computer Science", topic: "Algorithms", type: "Study" },
    "11:00": { subject: "Computer Science", topic: "Problem Solving", type: "Practice" },
    "12:00": { subject: "Break", topic: "Lunch", type: "Break" },
    "14:00": { subject: "Mathematics", topic: "Calculus", type: "Study" },
    "15:00": { subject: "Mathematics", topic: "Applications", type: "Practice" },
    "16:00": { subject: "Break", topic: "Snack Break", type: "Break" },
    "17:00": { subject: "Physics", topic: "Electromagnetism", type: "Study" },
    "18:00": { subject: "Physics", topic: "Problem Solving", type: "Practice" },
    "19:00": { subject: "Free Time", topic: "Recreation", type: "Break" }
  },
  "Saturday": {
    "09:00": { subject: "Free Time", topic: "Relaxation", type: "Break" },
    "10:00": { subject: "Mathematics", topic: "Revision", type: "Study" },
    "11:00": { subject: "Physics", topic: "Revision", type: "Study" },
    "12:00": { subject: "Break", topic: "Lunch", type: "Break" },
    "14:00": { subject: "Chemistry", topic: "Revision", type: "Study" },
    "15:00": { subject: "English", topic: "Revision", type: "Study" },
    "16:00": { subject: "Break", topic: "Snack Break", type: "Break" },
    "17:00": { subject: "Computer Science", topic: "Project Work", type: "Practice" },
    "18:00": { subject: "Biology", topic: "Revision", type: "Study" },
    "19:00": { subject: "Free Time", topic: "Recreation", type: "Break" }
  },
  "Sunday": {
    "09:00": { subject: "Free Time", topic: "Rest", type: "Break" },
    "10:00": { subject: "Free Time", topic: "Planning", type: "Break" },
    "11:00": { subject: "Free Time", topic: "Hobbies", type: "Break" },
    "12:00": { subject: "Break", topic: "Lunch", type: "Break" },
    "14:00": { subject: "Free Time", topic: "Family Time", type: "Break" },
    "15:00": { subject: "Free Time", topic: "Exercise", type: "Break" },
    "16:00": { subject: "Break", topic: "Snack Break", type: "Break" },
    "17:00": { subject: "Free Time", topic: "Reading", type: "Break" },
    "18:00": { subject: "Free Time", topic: "Preparation", type: "Break" },
    "19:00": { subject: "Free Time", topic: "Recreation", type: "Break" }
  }
};

export default function Timetable() {
  const [timetable, setTimetable] = useState(initialTimetable);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [editingSlot, setEditingSlot] = useState({
    subject: "",
    topic: "",
    type: "Study"
  });
  const { toast } = useToast();

  const saveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Timetable Saved",
      description: "Your study schedule has been updated successfully."
    });
  };

  const addTimeSlot = () => {
    if (!selectedDay || !selectedTime || !editingSlot.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setTimetable(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedTime]: editingSlot
      }
    }));

    setIsAddSlotOpen(false);
    setSelectedDay("");
    setSelectedTime("");
    setEditingSlot({ subject: "", topic: "", type: "Study" });

    toast({
      title: "Time Slot Added",
      description: "New time slot has been added to your timetable."
    });
  };

  const removeTimeSlot = (day: string, time: string) => {
    setTimetable(prev => {
      const newTimetable = { ...prev };
      delete newTimetable[day][time];
      return newTimetable;
    });

    toast({
      title: "Time Slot Removed",
      description: "Time slot has been removed from your timetable."
    });
  };

  const setAlarm = (day: string, time: string, subject: string) => {
    toast({
      title: "Alarm Set",
      description: `Alarm set for ${subject} on ${day} at ${time}`
    });
  };

  const getTotalStudyHours = () => {
    let totalHours = 0;
    Object.values(timetable).forEach(day => {
      Object.values(day).forEach(slot => {
        if (slot.type === "Study" || slot.type === "Practice") {
          totalHours++;
        }
      });
    });
    return totalHours;
  };

  const getSubjectHours = () => {
    const subjectHours: { [key: string]: number } = {};
    Object.values(timetable).forEach(day => {
      Object.values(day).forEach(slot => {
        if (slot.type === "Study" || slot.type === "Practice") {
          subjectHours[slot.subject] = (subjectHours[slot.subject] || 0) + 1;
        }
      });
    });
    return subjectHours;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Study Timetable
          </h1>
          <p className="text-muted-foreground mt-2">
            Plan and manage your weekly study schedule
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isAddSlotOpen} onOpenChange={setIsAddSlotOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Slot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Time Slot</DialogTitle>
                <DialogDescription>Add a new study session to your timetable</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="day">Day</label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {weekDays.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="time">Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="subject">Subject</label>
                  <Select value={editingSlot.subject} onValueChange={(value) => setEditingSlot({...editingSlot, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(subjectColors).map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="topic">Topic</label>
                  <Input
                    value={editingSlot.topic}
                    onChange={(e) => setEditingSlot({...editingSlot, topic: e.target.value})}
                    placeholder="Enter topic"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="type">Type</label>
                  <Select value={editingSlot.type} onValueChange={(value) => setEditingSlot({...editingSlot, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Study">Study</SelectItem>
                      <SelectItem value="Practice">Practice</SelectItem>
                      <SelectItem value="Break">Break</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddSlotOpen(false)}>Cancel</Button>
                <Button onClick={addTimeSlot}>Add Slot</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {isEditing ? (
            <Button onClick={saveChanges} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Timetable
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalStudyHours()}</div>
            <p className="text-xs text-muted-foreground">Per week</p>
          </CardContent>
        </Card>

        {Object.entries(getSubjectHours()).slice(0, 3).map(([subject, hours]) => (
          <Card key={subject}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{subject}</CardTitle>
              <Badge variant="outline">{hours}h</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{Math.round((hours / getTotalStudyHours()) * 100)}%</div>
              <p className="text-xs text-muted-foreground">Of total time</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Your comprehensive study timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div className="p-2 font-medium text-center bg-muted rounded">Time</div>
                {weekDays.map(day => (
                  <div key={day} className="p-2 font-medium text-center bg-muted rounded">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                  <div className="p-2 text-center border rounded bg-background font-medium">
                    {time}
                  </div>
                  {weekDays.map(day => {
                    const slot = timetable[day]?.[time];
                    return (
                      <div key={`${day}-${time}`} className="relative">
                        {slot ? (
                          <div className={`p-2 rounded border text-xs ${subjectColors[slot.subject as keyof typeof subjectColors]} relative group`}>
                            <div className="font-medium">{slot.subject}</div>
                            <div className="text-xs opacity-75">{slot.topic}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {slot.type}
                            </Badge>
                            
                            {isEditing && (
                              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => removeTimeSlot(day, time)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                            
                            {!isEditing && slot.type !== "Break" && (
                              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 bg-primary hover:bg-primary/80 text-white"
                                  onClick={() => setAlarm(day, time, slot.subject)}
                                >
                                  <Bell className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-2 border-2 border-dashed border-muted rounded h-16 flex items-center justify-center text-muted-foreground">
                            {isEditing ? "Add slot" : "Free"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subject Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(subjectColors).map(([subject, colorClass]) => (
              <div key={subject} className={`p-2 rounded text-xs text-center ${colorClass}`}>
                {subject}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}