import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  User,
  Calendar,
  FileText,
  Download,
  Share2
} from 'lucide-react';
import { CriminalCase, CaseStatus, CrimeType } from '../../types';
import { criminalCases } from '../../data/mockData';
import { format } from 'date-fns';
import AddCaseModal from './AddCaseModal';

const CasesList: React.FC = () => {
  const [cases, setCases] = useState<CriminalCase[]>(criminalCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all');
  const [crimeTypeFilter, setCrimeTypeFilter] = useState<CrimeType | 'all'>('all');
  const [selectedCase, setSelectedCase] = useState<CriminalCase | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    const matchesType = crimeTypeFilter === 'all' || case_.crimeType === crimeTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddCase = (caseData: Omit<CriminalCase, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newCase: CriminalCase = {
      ...caseData,
      id: `case-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user'
    };
    setCases([newCase, ...cases]);
  };

  const getStatusIcon = (status: CaseStatus) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'under_investigation':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'reported':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportCases = () => {
    const csvContent = [
      ['Case Number', 'Title', 'Type', 'Status', 'Severity', 'Location', 'Date'],
      ...filteredCases.map(case_ => [
        case_.caseNumber,
        case_.title,
        case_.crimeType,
        case_.status,
        case_.severity,
        case_.location,
        format(case_.reportedDate, 'yyyy-MM-dd')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cases-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Criminal Cases</h2>
          <p className="text-slate-600">Manage and track criminal cases</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportCases}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Case</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Cases</p>
              <p className="text-2xl font-bold text-slate-800">{cases.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Solved Cases</p>
              <p className="text-2xl font-bold text-slate-800">
                {cases.filter(c => c.status === 'solved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Under Investigation</p>
              <p className="text-2xl font-bold text-slate-800">
                {cases.filter(c => c.status === 'under_investigation').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Critical Cases</p>
              <p className="text-2xl font-bold text-slate-800">
                {cases.filter(c => c.severity === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cases by number, title, or location..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CaseStatus | 'all')}
            >
              <option value="all">All Status</option>
              <option value="reported">Reported</option>
              <option value="under_investigation">Under Investigation</option>
              <option value="solved">Solved</option>
              <option value="closed">Closed</option>
              <option value="cold_case">Cold Case</option>
            </select>
          </div>

          {/* Crime Type Filter */}
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={crimeTypeFilter}
            onChange={(e) => setCrimeTypeFilter(e.target.value as CrimeType | 'all')}
          >
            <option value="all">All Types</option>
            <option value="theft">Theft</option>
            <option value="burglary">Burglary</option>
            <option value="robbery">Robbery</option>
            <option value="assault">Assault</option>
            <option value="fraud">Fraud</option>
            <option value="drug_related">Drug Related</option>
            <option value="domestic_violence">Domestic Violence</option>
            <option value="murder">Murder</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="w-4 h-4 flex flex-col space-y-1">
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Cases Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredCases.map((case_) => (
            <div key={case_.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-lg font-semibold text-slate-800">{case_.caseNumber}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(case_.severity)}`}>
                        {case_.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        case_.status === 'solved' ? 'bg-green-100 text-green-800' :
                        case_.status === 'under_investigation' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {case_.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{case_.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{case_.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span>{case_.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>{format(case_.incidentDate, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <User className="h-4 w-4" />
                        <span>{case_.suspects.length} Suspect(s)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <span className="capitalize">{case_.crimeType.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {getStatusIcon(case_.status)}
                    <button
                      onClick={() => setSelectedCase(case_)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Case Progress Bar */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                    <span>Case Progress</span>
                    <span>{case_.status === 'solved' ? '100%' : case_.status === 'under_investigation' ? '60%' : '20%'}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        case_.status === 'solved' ? 'bg-green-500' :
                        case_.status === 'under_investigation' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ 
                        width: case_.status === 'solved' ? '100%' : 
                               case_.status === 'under_investigation' ? '60%' : '20%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-slate-700">Case</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-700">Type</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-700">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-700">Severity</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-700">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-700">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCases.map((case_) => (
                  <tr key={case_.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-800">{case_.caseNumber}</p>
                        <p className="text-sm text-slate-600">{case_.title}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="capitalize text-slate-600">{case_.crimeType.replace('_', ' ')}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(case_.status)}
                        <span className="text-sm capitalize">{case_.status.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(case_.severity)}`}>
                        {case_.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{case_.location}</td>
                    <td className="py-4 px-6 text-slate-600">{format(case_.incidentDate, 'MMM dd, yyyy')}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCase(case_)}
                          className="p-1 text-slate-600 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-slate-600 hover:text-green-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No cases found matching your criteria.</p>
        </div>
      )}

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">Case Details</h3>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Case Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Case Number:</span> {selectedCase.caseNumber}</p>
                    <p><span className="font-medium">Title:</span> {selectedCase.title}</p>
                    <p><span className="font-medium">Type:</span> {selectedCase.crimeType.replace('_', ' ')}</p>
                    <p><span className="font-medium">Severity:</span> {selectedCase.severity}</p>
                    <p><span className="font-medium">Status:</span> {selectedCase.status.replace('_', ' ')}</p>
                    <p><span className="font-medium">Location:</span> {selectedCase.location}</p>
                    <p><span className="font-medium">Incident Date:</span> {format(selectedCase.incidentDate, 'PPP')}</p>
                    <p><span className="font-medium">Reported Date:</span> {format(selectedCase.reportedDate, 'PPP')}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Description</h4>
                  <p className="text-sm text-slate-600 mb-4">{selectedCase.description}</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-3">Suspects</h4>
                  <div className="space-y-2">
                    {selectedCase.suspects.map((suspect) => (
                      <div key={suspect.id} className="p-3 bg-slate-50 rounded-lg">
                        <p className="font-medium">{suspect.name}</p>
                        <p className="text-sm text-slate-600">{suspect.description}</p>
                        <p className="text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            suspect.status === 'arrested' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {suspect.status.replace('_', ' ')}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Case Modal */}
      <AddCaseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCase}
      />
    </div>
  );
};

export default CasesList;