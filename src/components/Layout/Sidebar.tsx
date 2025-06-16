import React from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  Building2, 
  Search, 
  BarChart3, 
  Settings, 
  Shield,
  MapPin,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, hasPermission } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, permission: 'view_dashboard' },
    { id: 'cases', label: 'Cases', icon: FileText, permission: 'view_cases' },
    { id: 'stations', label: 'Police Stations', icon: Building2, permission: 'view_stations' },
    { id: 'criminals', label: 'Criminal Records', icon: Users, permission: 'view_criminals' },
    { id: 'search', label: 'Search & Query', icon: Search, permission: 'search_records' },
    { id: 'reports', label: 'Reports', icon: BarChart3, permission: 'view_reports' },
    { id: 'users', label: 'User Management', icon: Settings, permission: 'manage_users' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">ZCIS</h1>
            <p className="text-xs text-slate-400">Criminal Info System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-slate-700">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span>89 Solved</span>
          </div>
          <div className="flex items-center space-x-2 text-yellow-400">
            <Clock className="h-4 w-4" />
            <span>67 Pending</span>
          </div>
          <div className="flex items-center space-x-2 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span>12 Critical</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-400">
            <MapPin className="h-4 w-4" />
            <span>15 Stations</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const hasAccess = hasPermission(item.permission) || hasPermission('*');

          if (!hasAccess) return null;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          © 2024 Zambia Police Service
        </p>
      </div>
    </div>
  );
};

export default Sidebar;