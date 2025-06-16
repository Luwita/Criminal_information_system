import React from 'react';
import { Plus, Search, FileText, Users, AlertTriangle, Clock } from 'lucide-react';

interface QuickActionsProps {
  onNewCase: () => void;
  onNewRecord: () => void;
  onSearch: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNewCase, onNewRecord, onSearch }) => {
  const actions = [
    {
      id: 'new-case',
      title: 'New Case',
      description: 'Report a new criminal case',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: onNewCase
    },
    {
      id: 'new-record',
      title: 'New Criminal Record',
      description: 'Add a new criminal profile',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: onNewRecord
    },
    {
      id: 'search',
      title: 'Advanced Search',
      description: 'Search cases and records',
      icon: Search,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: onSearch
    },
    {
      id: 'urgent-cases',
      title: 'Urgent Cases',
      description: 'View high priority cases',
      icon: AlertTriangle,
      color: 'bg-red-600 hover:bg-red-700',
      onClick: () => {}
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 rounded-lg transition-colors group`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;