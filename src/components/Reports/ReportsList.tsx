import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  TrendingUp,
  Users,
  Building2,
  Shield
} from 'lucide-react';
import { Report, ReportType } from '../../types';
import { reports } from '../../data/mockData';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportsList: React.FC = () => {
  const [reportsList, setReportsList] = useState<Report[]>(reports);
  const [selectedType, setSelectedType] = useState<ReportType | 'all'>('all');
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [newReportType, setNewReportType] = useState<ReportType>('crime_statistics');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredReports = reportsList.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'generating':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getReportTypeIcon = (type: ReportType) => {
    switch (type) {
      case 'crime_statistics':
        return <BarChart3 className="h-5 w-5 text-blue-500" />;
      case 'case_summary':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'officer_performance':
        return <Users className="h-5 w-5 text-purple-500" />;
      case 'station_activity':
        return <Building2 className="h-5 w-5 text-orange-500" />;
      case 'criminal_profile':
        return <Shield className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const generateReport = () => {
    const newReport: Report = {
      id: `report-${Date.now()}`,
      title: `${newReportType.replace('_', ' ').toUpperCase()} Report - ${format(new Date(), 'MMM yyyy')}`,
      type: newReportType,
      description: `Generated ${newReportType.replace('_', ' ')} report`,
      parameters: {
        dateRange: {
          from: new Date(dateFrom),
          to: new Date(dateTo)
        },
        filters: {},
        includeCharts: true,
        includeDetails: true
      },
      generatedBy: 'current-user',
      generatedAt: new Date(),
      format: 'pdf',
      status: 'generating'
    };

    setReportsList([newReport, ...reportsList]);
    setShowNewReportModal(false);
    
    // Simulate report generation
    setTimeout(() => {
      setReportsList(prev => prev.map(report => 
        report.id === newReport.id 
          ? { ...report, status: 'completed', downloadUrl: `/reports/${newReport.id}.pdf` }
          : report
      ));
    }, 3000);
  };

  // Sample data for dashboard charts
  const crimeStatsData = [
    { month: 'Jan', theft: 45, burglary: 32, assault: 23, fraud: 15 },
    { month: 'Feb', theft: 38, burglary: 28, assault: 19, fraud: 12 },
    { month: 'Mar', theft: 52, burglary: 35, assault: 27, fraud: 18 },
    { month: 'Apr', theft: 41, burglary: 30, assault: 21, fraud: 14 },
    { month: 'May', theft: 47, burglary: 33, assault: 25, fraud: 16 },
    { month: 'Jun', theft: 43, burglary: 29, assault: 22, fraud: 13 }
  ];

  const caseResolutionData = [
    { month: 'Jan', solved: 78, pending: 45 },
    { month: 'Feb', solved: 82, pending: 38 },
    { month: 'Mar', solved: 75, pending: 52 },
    { month: 'Apr', solved: 88, pending: 41 },
    { month: 'May', solved: 79, pending: 47 },
    { month: 'Jun', solved: 85, pending: 43 }
  ];

  const stationPerformanceData = [
    { name: 'Central', cases: 156, solved: 89, rate: 57 },
    { name: 'Kamwala', cases: 134, solved: 78, rate: 58 },
    { name: 'Chilenje', cases: 98, solved: 62, rate: 63 },
    { name: 'Kabulonga', cases: 76, solved: 51, rate: 67 },
    { name: 'Woodlands', cases: 45, solved: 32, rate: 71 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reports & Analytics</h2>
          <p className="text-slate-600">Generate and manage system reports</p>
        </div>
        <button 
          onClick={() => setShowNewReportModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crime Statistics Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Crime Statistics (6 Months)</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={crimeStatsData}>
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
              <Bar dataKey="theft" fill="#3B82F6" />
              <Bar dataKey="burglary" fill="#10B981" />
              <Bar dataKey="assault" fill="#F59E0B" />
              <Bar dataKey="fraud" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Case Resolution Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Case Resolution Trend</h3>
            <CheckCircle className="h-5 w-5 text-blue-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={caseResolutionData}>
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
              <Line type="monotone" dataKey="solved" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Station Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Station Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stationPerformanceData.map((station, index) => (
            <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800">{station.name}</h4>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-600">{station.rate}%</div>
                <div className="text-sm text-slate-600">Resolution Rate</div>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {station.solved}/{station.cases} cases
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Generated Reports</h3>
          
          <div className="flex items-center space-x-3">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ReportType | 'all')}
            >
              <option value="all">All Report Types</option>
              <option value="crime_statistics">Crime Statistics</option>
              <option value="case_summary">Case Summary</option>
              <option value="officer_performance">Officer Performance</option>
              <option value="station_activity">Station Activity</option>
              <option value="criminal_profile">Criminal Profile</option>
              <option value="evidence_inventory">Evidence Inventory</option>
              <option value="court_calendar">Court Calendar</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getReportTypeIcon(report.type)}
                  <div>
                    <h4 className="font-semibold text-slate-800">{report.title}</h4>
                    <p className="text-sm text-slate-600">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(report.generatedAt, 'MMM dd, yyyy HH:mm')}</span>
                      </span>
                      <span className="capitalize">{report.format.toUpperCase()}</span>
                      <span className="capitalize">{report.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(report.status)}
                    <span className={`text-sm font-medium ${
                      report.status === 'completed' ? 'text-green-600' :
                      report.status === 'generating' ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    {report.status === 'completed' && (
                      <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button className="p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No reports found. Generate your first report to get started.</p>
          </div>
        )}
      </div>

      {/* Generate Report Modal */}
      {showNewReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Generate New Report</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Report Type</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newReportType}
                  onChange={(e) => setNewReportType(e.target.value as ReportType)}
                >
                  <option value="crime_statistics">Crime Statistics</option>
                  <option value="case_summary">Case Summary</option>
                  <option value="officer_performance">Officer Performance</option>
                  <option value="station_activity">Station Activity</option>
                  <option value="criminal_profile">Criminal Profile</option>
                  <option value="evidence_inventory">Evidence Inventory</option>
                  <option value="court_calendar">Court Calendar</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">From Date</label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">To Date</label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowNewReportModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateReport}
                  disabled={!dateFrom || !dateTo}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsList;