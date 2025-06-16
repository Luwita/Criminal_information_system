import React from 'react';
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Building2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { crimeStatistics } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Cases',
      value: crimeStatistics.totalCases,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
      isPositive: false
    },
    {
      title: 'Solved Cases',
      value: crimeStatistics.solvedCases,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Pending Cases',
      value: crimeStatistics.pendingCases,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+5%',
      isPositive: false
    },
    {
      title: 'Critical Cases',
      value: 12,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-3%',
      isPositive: true
    }
  ];

  const crimeTypeData = Object.entries(crimeStatistics.crimesByType)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key.replace('_', ' ').toUpperCase(),
      value,
      color: getColorForCrimeType(key)
    }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Cases Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Monthly Cases Overview</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-slate-600">Total Cases</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-slate-600">Solved Cases</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={crimeStatistics.crimesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="cases" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="solved" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Crime Types Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Crime Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={crimeTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {crimeTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Top Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Cases</h3>
          <div className="space-y-4">
            {[
              { id: 'LSK/2024/001', type: 'Burglary', location: 'Kabulonga', status: 'Under Investigation', priority: 'Medium' },
              { id: 'LSK/2024/002', type: 'Theft', location: 'CBD', status: 'Solved', priority: 'High' },
              { id: 'LSK/2024/003', type: 'Assault', location: 'Chilenje', status: 'Reported', priority: 'High' },
              { id: 'LSK/2024/004', type: 'Fraud', location: 'Kamwala', status: 'Under Investigation', priority: 'Low' }
            ].map((case_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-800">{case_.id}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{case_.type}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{case_.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    case_.priority === 'High' ? 'bg-red-100 text-red-700' :
                    case_.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {case_.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    case_.status === 'Solved' ? 'bg-green-100 text-green-700' :
                    case_.status === 'Under Investigation' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {case_.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Crime Locations */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Crime Locations</h3>
          <div className="space-y-4">
            {crimeStatistics.topCrimeLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{location.location}</p>
                    <div className="w-32 bg-slate-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(location.cases / crimeStatistics.topCrimeLocations[0].cases) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600">{location.cases}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getColorForCrimeType(type: string): string {
  const colors: Record<string, string> = {
    'theft': '#3B82F6',
    'burglary': '#10B981',
    'robbery': '#F59E0B',
    'assault': '#EF4444',
    'fraud': '#8B5CF6',
    'drug_related': '#06B6D4',
    'domestic_violence': '#F97316',
    'murder': '#DC2626'
  };
  return colors[type] || '#6B7280';
}

export default Dashboard;