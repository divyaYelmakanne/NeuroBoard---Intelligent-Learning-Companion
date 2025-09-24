import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, Calendar, MapPin, Award, Target, BookOpen, Trophy, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const achievements = [
  { title: "Math Champion", description: "Scored 95%+ in Mathematics", icon: "🏆", date: "2024-01-15" },
  { title: "Perfect Attendance", description: "100% attendance this semester", icon: "🎯", date: "2024-01-10" },
  { title: "Code Master", description: "Completed 5 programming courses", icon: "💻", date: "2024-01-05" },
  { title: "Study Streak", description: "30 consecutive days of study", icon: "🔥", date: "2024-01-01" }
];

const stats = [
  { label: "Courses Completed", value: "12", icon: BookOpen },
  { label: "Average Score", value: "87%", icon: Target },
  { label: "Study Hours", value: "156", icon: Calendar },
  { label: "Achievements", value: "8", icon: Trophy }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthDate: user?.birthDate || "",
    address: user?.address || "",
    grade: user?.grade || "12th Grade",
    school: user?.school || "Central High School",
    bio: user?.bio || "Passionate student ready to learn and grow."
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        address: user.address || "",
        grade: user.grade || "12th Grade",
        school: user.school || "Central High School",
        bio: user.bio || "Passionate student ready to learn and grow."
      });
    }
  }, [user]);

  const saveProfile = () => {
    updateProfile(profile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Student Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and view your achievements
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => isEditing ? saveProfile() : setIsEditing(true)}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{profile.name}</CardTitle>
            <CardDescription>{profile.grade} • {profile.school}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 border rounded-lg">
                  <stat.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="academic">Academic Record</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                          />
                        ) : (
                          <span>{profile.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                          />
                        ) : (
                          <span>{profile.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          />
                        ) : (
                          <span>{profile.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Date of Birth</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            id="birthDate"
                            type="date"
                            value={profile.birthDate}
                            onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                          />
                        ) : (
                          <span>{new Date(profile.birthDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                        />
                      ) : (
                        <span>{profile.address}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Badges</CardTitle>
                  <CardDescription>Your accomplishments and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <Badge variant="outline" className="mt-2">
                            {new Date(achievement.date).toLocaleDateString()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Record</CardTitle>
                  <CardDescription>Your educational progress and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Current Grade</h4>
                      <p className="text-2xl font-bold text-primary">{profile.grade}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">School</h4>
                      <p className="text-lg">{profile.school}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Overall GPA</h4>
                      <p className="text-2xl font-bold text-green-600">3.7/4.0</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Class Rank</h4>
                      <p className="text-2xl font-bold text-blue-600">15/120</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}