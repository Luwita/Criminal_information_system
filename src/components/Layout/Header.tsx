import React, { useState } from 'react';
import { Bell, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationPanel from './NotificationPanel';
import SettingsModal from './SettingsModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Zambia Criminal Information System
            </h2>
            <p className="text-sm text-slate-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Settings */}
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-800">{user?.name}</p>
                  <p className="text-slate-600 capitalize">
                    {user?.role.replace('_', ' ')}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
};

export default Header;