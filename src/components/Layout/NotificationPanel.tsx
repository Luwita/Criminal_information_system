import React, { useState } from 'react';
import { X, Bell, AlertTriangle, CheckCircle, Info, Clock, Trash2, BookMarked as MarkAsRead } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-001',
      type: 'warning',
      title: 'High Priority Case Update',
      message: 'Case LSK/2024/001 requires immediate attention. Suspect has been identified.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false
    },
    {
      id: 'notif-002',
      type: 'success',
      title: 'Case Solved',
      message: 'Case LSK/2024/002 has been successfully closed. Suspect arrested and charged.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false
    },
    {
      id: 'notif-003',
      type: 'info',
      title: 'New Criminal Record Added',
      message: 'A new criminal record has been added to the database by Detective Grace Mulenga.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true
    },
    {
      id: 'notif-004',
      type: 'warning',
      title: 'Evidence Expiry Alert',
      message: 'Evidence for case LSK/2023/156 is approaching storage expiry date.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: true
    },
    {
      id: 'notif-005',
      type: 'error',
      title: 'System Backup Failed',
      message: 'Daily system backup failed. Please contact IT support immediately.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      isRead: false
    },
    {
      id: 'notif-006',
      type: 'info',
      title: 'Monthly Report Generated',
      message: 'Crime statistics report for January 2024 has been generated and is ready for download.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string, isRead: boolean) => {
    const opacity = isRead ? '50' : '100';
    switch (type) {
      case 'warning':
        return `bg-yellow-${opacity} border-yellow-200`;
      case 'success':
        return `bg-green-${opacity} border-green-200`;
      case 'error':
        return `bg-red-${opacity} border-red-200`;
      default:
        return `bg-blue-${opacity} border-blue-200`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl mt-16 mr-4">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-800">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Action Buttons */}
          {notifications.length > 0 && (
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAllNotifications}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-slate-50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.isRead ? 'text-slate-900' : 'text-slate-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className={`text-sm mt-1 ${
                            !notification.isRead ? 'text-slate-700' : 'text-slate-500'
                          }`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-500">
                              {format(notification.timestamp, 'MMM dd, HH:mm')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full absolute right-4 mt-2"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-slate-600 mb-2">No notifications</h4>
              <p className="text-sm text-slate-500">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View all notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;