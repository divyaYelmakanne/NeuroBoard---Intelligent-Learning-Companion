import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus, Bell, BookOpen, Users, FileText, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const upcomingEvents = [
  {
    id: 1,
    title: "Mathematics Mid-term Exam",
    date: "2024-01-20",
    time: "09:00",
    type: "exam",
    reminder: true,
    description: "Chapters 1-5 coverage"
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2024-01-25",
    time: "14:00",
    type: "meeting",
    reminder: true,
    description: "Discuss academic progress"
  },
  {
    id: 3,
    title: "Physics Project Due",
    date: "2024-01-28",
    time: "23:59",
    type: "assignment",
    reminder: true,
    description: "Motion and Energy project submission"
  },
  {
    id: 4,
    title: "Chemistry Lab Session",
    date: "2024-01-30",
    time: "10:00",
    type: "class",
    reminder: false,
    description: "Organic compounds practical"
  },
  {
    id: 5,
    title: "Annual Science Fair",
    date: "2024-02-05",
    time: "09:00",
    type: "event",
    reminder: true,
    description: "School-wide science exhibition"
  }
];

const eventTypeIcons = {
  exam: <FileText className="h-4 w-4" />,
  meeting: <Users className="h-4 w-4" />,
  assignment: <BookOpen className="h-4 w-4" />,
  class: <GraduationCap className="h-4 w-4" />,
  event: <CalendarIcon className="h-4 w-4" />
};

const eventTypeColors = {
  exam: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  assignment: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  event: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
};

export default function Calendar() {
  const [events, setEvents] = useState(upcomingEvents);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    description: "",
    reminder: false
  });
  const { toast } = useToast();

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event = {
      id: events.length + 1,
      ...newEvent
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "",
      description: "",
      reminder: false
    });
    setIsAddEventOpen(false);

    toast({
      title: "Event Added",
      description: `${newEvent.title} has been added to your calendar.`
    });
  };

  const toggleReminder = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, reminder: !event.reminder }
        : event
    ));
    
    toast({
      title: "Reminder Updated",
      description: "Event reminder has been toggled."
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    if (!day) return [];
    const date = new Date(selectedDate);
    date.setDate(day);
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const currentDate = new Date(selectedDate);
  const days = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Academic Calendar
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your schedule, events, and important deadlines
          </p>
        </div>
        
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event or reminder for your calendar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Event Type</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Event description (optional)"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={newEvent.reminder}
                  onChange={(e) => setNewEvent({...newEvent, reminder: e.target.checked})}
                  className="h-4 w-4"
                />
                <Label htmlFor="reminder">Set reminder</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addEvent}>Add Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => changeMonth(-1)}>
                    ←
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => changeMonth(1)}>
                    →
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[80px] p-2 border rounded-md ${
                      day ? 'hover:bg-accent cursor-pointer' : ''
                    } ${
                      day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()
                        ? 'bg-primary/10 border-primary' 
                        : ''
                    }`}
                  >
                    {day && (
                      <>
                        <div className="font-medium text-sm">{day}</div>
                        <div className="space-y-1">
                          {getEventsForDate(day).slice(0, 2).map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className={`text-xs px-1 py-0.5 rounded text-center ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}
                            >
                              {event.title.length > 8 ? `${event.title.slice(0, 8)}...` : event.title}
                            </div>
                          ))}
                          {getEventsForDate(day).length > 2 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{getEventsForDate(day).length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Events</CardTitle>
              <CardDescription>Your next important dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`p-2 rounded-lg ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}>
                    {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => toggleReminder(event.id)}
                      >
                        <Bell className={`h-3 w-3 ${event.reminder ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      {event.date}
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                    
                    {event.description && (
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Events</span>
                <Badge variant="secondary">{events.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Exams This Month</span>
                <Badge variant="destructive">{events.filter(e => e.type === 'exam').length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Assignments Due</span>
                <Badge variant="outline">{events.filter(e => e.type === 'assignment').length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Reminders</span>
                <Badge variant="default">{events.filter(e => e.reminder).length}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}