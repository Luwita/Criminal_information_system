import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('criminalSystem_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = users.find(u => u.email === email && u.isActive);
    
    if (foundUser && password === 'password123') { // Mock password
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('criminalSystem_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('criminalSystem_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    const permissions: Record<string, string[]> = {
      super_admin: ['*'],
      provincial_admin: [
        'view_dashboard', 'view_cases', 'view_stations', 'view_criminals', 
        'search_records', 'view_reports', 'manage_users', 'view_all_cases', 
        'manage_stations', 'manage_district_stations'
      ],
      district_admin: [
        'view_dashboard', 'view_cases', 'view_stations', 'view_criminals',
        'search_records', 'view_reports', 'view_district_cases', 
        'manage_district_stations', 'view_district_reports'
      ],
      station_commander: [
        'view_dashboard', 'view_cases', 'view_stations', 'view_criminals',
        'search_records', 'view_reports', 'view_station_cases', 
        'manage_station', 'assign_cases', 'view_station_reports'
      ],
      detective: [
        'view_dashboard', 'view_cases', 'view_criminals', 'search_records',
        'view_assigned_cases', 'update_cases', 'manage_evidence'
      ],
      police_officer: [
        'view_dashboard', 'view_cases', 'view_criminals', 'search_records',
        'view_assigned_cases', 'create_cases', 'update_cases'
      ],
      data_entry_clerk: [
        'view_dashboard', 'view_cases', 'view_criminals', 'create_cases', 'update_cases'
      ]
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};