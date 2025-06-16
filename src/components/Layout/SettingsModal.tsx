import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    caseUpdates: true,
    systemAlerts: true,
    weeklyReports: false,
    maintenanceAlerts: true
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Africa/Lusaka',
    dateFormat: 'DD/MM/YYYY',
    autoLogout: 30,
    sessionTimeout: 60
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    requirePasswordChange: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Settings },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  const handleSaveProfile = () => {
    // Validate and save profile changes
    console.log('Saving profile:', profileData);
  };

  const handleSaveNotifications = () => {
    // Save notification preferences
    console.log('Saving notifications:', notificationSettings);
  };

  const handleSaveSecurity = () => {
    // Save security settings
    console.log('Saving security:', securitySettings);
  };

  const handleSaveSystem = () => {
    // Save system preferences
    console.log('Saving system:', systemSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-800">Settings</h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Profile Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-100"
                        value={user?.role.replace('_', ' ').toUpperCase()}
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Station
                      </label>
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-100"
                        value="Central Police Station"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Change Password</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={profileData.currentPassword}
                          onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-slate-800">Notification Preferences</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-700">Email Notifications</h5>
                      <p className="text-sm text-slate-500">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-700">Push Notifications</h5>
                      <p className="text-sm text-slate-500">Receive browser push notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-700">Case Updates</h5>
                      <p className="text-sm text-slate-500">Notifications for case status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.caseUpdates}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          caseUpdates: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-700">System Alerts</h5>
                      <p className="text-sm text-slate-500">Important system notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.systemAlerts}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          systemAlerts: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-700">Weekly Reports</h5>
                      <p className="text-sm text-slate-500">Weekly summary reports</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          weeklyReports: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-slate-800">Security Settings</h4>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-700">Two-Factor Authentication</h5>
                      <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Password Expiry (days)
                      </label>
                      <input
                        type="number"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          passwordExpiry: parseInt(e.target.value)
                        })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-700">Login Alerts</h5>
                      <p className="text-sm text-slate-500">Get notified of new login attempts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          loginAlerts: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSecurity}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Security Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-slate-800">System Preferences</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Theme
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={systemSettings.theme}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings,
                        theme: e.target.value
                      })}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Language
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={systemSettings.language}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings,
                        language: e.target.value
                      })}
                    >
                      <option value="en">English</option>
                      <option value="ny">Chichewa</option>
                      <option value="bem">Bemba</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Timezone
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={systemSettings.timezone}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings,
                        timezone: e.target.value
                      })}
                    >
                      <option value="Africa/Lusaka">Africa/Lusaka (CAT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Date Format
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={systemSettings.dateFormat}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings,
                        dateFormat: e.target.value
                      })}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Auto Logout (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={systemSettings.autoLogout}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings,
                        autoLogout: parseInt(e.target.value)
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings,
                        sessionTimeout: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSystem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save System Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Data & Privacy Tab */}
            {activeTab === 'data' && (
              <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-slate-800">Data & Privacy</h4>
                
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-800 mb-2">Data Retention Policy</h5>
                    <p className="text-sm text-yellow-700">
                      Criminal records and case data are retained according to Zambian law enforcement regulations. 
                      Personal data is protected under the Data Protection Act.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <h5 className="font-medium text-slate-700">Download My Data</h5>
                      <p className="text-sm text-slate-500 mt-1">
                        Request a copy of your personal data stored in the system
                      </p>
                    </button>

                    <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <h5 className="font-medium text-slate-700">Activity Log</h5>
                      <p className="text-sm text-slate-500 mt-1">
                        View your recent activity and system access logs
                      </p>
                    </button>

                    <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                      <h5 className="font-medium text-red-700">Delete Account</h5>
                      <p className="text-sm text-red-500 mt-1">
                        Permanently delete your account and associated data
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;