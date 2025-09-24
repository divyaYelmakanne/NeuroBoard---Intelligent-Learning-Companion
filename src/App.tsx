import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MainLayout } from "./components/MainLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import MoodTracker from "./pages/MoodTracker";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import Curriculum from "./pages/Curriculum";
import Timetable from "./pages/Timetable";
import Tools from "./pages/Tools";
import MockTests from "./pages/MockTests";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Tasks />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/mood" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MoodTracker />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Reports />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/curriculum" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Curriculum />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Calendar />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/timetable" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Timetable />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/tools" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Tools />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/tests" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MockTests />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Courses />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/ai-assistant" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AIAssistant />
                  </MainLayout>
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
