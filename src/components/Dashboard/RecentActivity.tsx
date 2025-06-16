import React from 'react';
import { Clock, User, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'case_created' | 'case_updated' | 'record_added' | 'case_solved' | 'evidence_added';
  title: string;
  description: string;
  user: string;
  timestamp: Date;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 'act-001',
      type: 'case_created',
      title: 'New Case Created',
      description: 'Burglary case LSK/2024/003 reported in Kabulonga',
      user: 'Officer James Mwanza',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: 'high'
    },
    {
      id: 'act-002',
      type: 'case_solved',
      title: 'Case Solved',
      description: 'Vehicle theft case LSK/2024/002 successfully closed',
      user: 'Detective Grace Mulenga',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      priority: 'medium'
    },
    {
      id: 'act-003',
      type: 'record_added',
      title: 'Criminal Record Added',
      description: 'New suspect profile created for Patrick Mwila',
      user: 'Data Clerk Sarah Phiri',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'low'
    },
    {
      id: 'act-004',
      type: 'evidence_added',
      title: 'Evidence Collected',
      description: 'Fingerprint evidence added to case LSK/2024/001',
      user: 'Forensics Team A',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      priority: 'medium'
    },
    {
      id: 'act-005',
      type: 'case_updated',
      title: 'Case Status Updated',
      description: 'Case LSK/2023/156 moved to under investigation',
      user: 'Inspector Michael Tembo',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'low'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case_created':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'case_solved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'record_added':
        return <User className="h-4 w-4 text-purple-500" />;
      case 'evidence_added':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'case_updated':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-red-500';
      case 'high':
        return 'border-l-orange-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`border-l-4 ${getPriorityColor(activity.priority)} pl-4 py-2`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                  <span>{activity.user}</span>
                  <span>{format(activity.timestamp, 'MMM dd, HH:mm')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;