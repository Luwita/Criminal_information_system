import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, MapPin, Users, AlertTriangle } from 'lucide-react';

const CrimeAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('cases');

  // Sample data for analytics
  const crimeData = [
    { month: 'Jan', theft: 45, burglary: 32, assault: 23, fraud: 15, total: 115 },
    { month: 'Feb', theft: 38, burglary: 28, assault: 19, fraud: 12, total: 97 },
    { month: 'Mar', theft: 52, burglary: 35, assault: 27, fraud: 18, total: 132 },
    { month: 'Apr', theft: 41, burglary: 30, assault: 21, fraud: 14, total: 106 },
    { month: 'May', theft: 47, burglary: 33, assault: 25, fraud: 16, total: 121 },
    { month: 'Jun', theft: 43, burglary: 29, assault: 22, fraud: 13, total: 107 }
  ];

  const resolutionData = [
    { month: 'Jan', solved: 78, pending: 37, rate: 67.8 },
    { month: 'Feb', solved: 82, pending: 15, rate: 84.5 },
    { month: 'Mar', solved: 75, pending: 57, rate: 56.8 },
    { month: 'Apr', solved: 88, pending: 18, rate: 83.0 },
    { month: 'May', solved: 79, pending: 42, rate: 65.3 },
    { month: 'Jun', solved: 85, pending: 22, rate: 79.4 }
  ];

  const locationData = [
    { name: 'Central Business District', cases: 156, change: '+12%', trend: 'up' },
    { name: 'Kamwala', cases: 134, change: '-8%', trend: 'down' },
    { name: 'Chilenje', cases: 98, change: '+15%', trend: 'up' },
    { name: 'Kabulonga', cases: 76, change: '-3%', trend: 'down' },
    { name: 'Woodlands', cases: 45, change: '+22%', trend: 'up' }
  ];

  const timePatternData = [
    { hour: '00:00', cases: 12 },
    { hour: '03:00', cases: 8 },
    { hour: '06:00', cases: 15 },
    { hour: '09:00', cases: 32 },
    { hour: '12:00', cases: 45 },
    { hour: '15:00', cases: 38 },
    { hour: '18:00', cases: 52 },
    { hour: '21:00', cases: 41 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Crime Analytics</h2>
          <p className="text-slate-600">Advanced crime data analysis and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="2years">Last 2 Years</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Crimes</p>
              <p className="text-2xl font-bold text-slate-800">678</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+8.2%</span>
              </div>
            </div>
            <AlertTriangle className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-slate-800">72.4%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+3.1%</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg. Resolution Time</p>
              <p className="text-2xl font-bold text-slate-800">14.2</p>
              <p className="text-sm text-slate-500">days</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-600">+2.3 days</span>
              </div>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Hotspot Areas</p>
              <p className="text-2xl font-bold text-slate-800">5</p>
              <p className="text-sm text-slate-500">active zones</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-600">+1 zone</span>
              </div>
            </div>
            <MapPin className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Crime Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Crime Trends by Type</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedMetric('cases')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedMetric === 'cases' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cases
            </button>
            <button
              onClick={() => setSelectedMetric('rate')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedMetric === 'rate' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Rate
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={crimeData}>
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
            <Area type="monotone" dataKey="theft" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="burglary" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            <Area type="monotone" dataKey="assault" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            <Area type="monotone" dataKey="fraud" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Resolution Rate & Time Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Rate */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Case Resolution Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Time Patterns */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Crime Time Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timePatternData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="cases" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Crime Hotspots Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {locationData.map((location, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800 text-sm">{location.name}</h4>
                <div className="flex items-center space-x-1">
                  {location.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-red-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-500" />
                  )}
                  <span className={`text-xs font-medium ${
                    location.trend === 'up' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {location.change}
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{location.cases}</p>
              <p className="text-xs text-slate-500">total cases</p>
              <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    location.trend === 'up' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(location.cases / locationData[0].cases) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Predictive Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-slate-700">Risk Forecast</span>
            </div>
            <p className="text-sm text-slate-600">
              Theft incidents likely to increase by 15% in CBD area during weekend evenings.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-slate-700">Hotspot Alert</span>
            </div>
            <p className="text-sm text-slate-600">
              New emerging hotspot detected in Kamwala area. Recommend increased patrols.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-slate-700">Seasonal Pattern</span>
            </div>
            <p className="text-sm text-slate-600">
              Burglary cases typically decrease by 20% during rainy season (Nov-Mar).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeAnalytics;