import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  grade?: string;
  school?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage on app load
    const storedUser = localStorage.getItem('neuroboard_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For now, we'll simulate with localStorage
    const storedUsers = JSON.parse(localStorage.getItem('neuroboard_users') || '[]');
    const foundUser = storedUsers.find((u: any) => u.email === email);
    
    if (foundUser) {
      const { password: _, ...userData } = foundUser;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('neuroboard_user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // In a real app, this would make an API call
    const { password, ...userDataWithoutPassword } = userData;
    const newUser = {
      ...userDataWithoutPassword,
      id: Date.now().toString(),
      phone: userData.phone || '',
      birthDate: userData.birthDate || '',
      address: userData.address || '',
      grade: userData.grade || '12th Grade',
      school: userData.school || 'Central High School',
      bio: userData.bio || 'Passionate student ready to learn and grow.'
    };

    // Store user in localStorage (in a real app, this would be a database)
    const storedUsers = JSON.parse(localStorage.getItem('neuroboard_users') || '[]');
    const userWithPassword = { ...newUser, password };
    storedUsers.push(userWithPassword);
    localStorage.setItem('neuroboard_users', JSON.stringify(storedUsers));

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('neuroboard_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('neuroboard_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('neuroboard_user', JSON.stringify(updatedUser));
      
      // Also update in users array
      const storedUsers = JSON.parse(localStorage.getItem('neuroboard_users') || '[]');
      const updatedUsers = storedUsers.map((u: any) => 
        u.id === user.id ? { ...u, ...userData } : u
      );
      localStorage.setItem('neuroboard_users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}