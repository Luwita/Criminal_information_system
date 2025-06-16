import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  User,
  Calendar,
  MapPin,
  AlertTriangle,
  Shield,
  FileText,
  Camera,
  Fingerprint
} from 'lucide-react';
import { CriminalRecord } from '../../types';
import { criminalRecords } from '../../data/mockData';
import { format } from 'date-fns';
import AddRecordModal from './AddRecordModal';

const CriminalRecordsList: React.FC = () => {
  const [records, setRecords] = useState<CriminalRecord[]>(criminalRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<CriminalRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRecords = records.filter(record => {
    const fullName = `${record.personalInfo.firstName} ${record.personalInfo.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         record.personalInfo.nationalId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.personalInfo.alias?.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || record.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleAddRecord = (recordData: Omit<CriminalRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newRecord: CriminalRecord = {
      ...recordData,
      id: `cr-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user'
    };
    setRecords([...records, newRecord]);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'extreme':
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'deceased':
        return 'bg-red-100 text-red-800';
      case 'deported':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Criminal Records</h2>
          <p className="text-slate-600">Manage criminal records and profiles</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Record</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Records</p>
              <p className="text-2xl font-bold text-slate-800">{records.length}</p>
            </div>
            <User className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Records</p>
              <p className="text-2xl font-bold text-slate-800">
                {records.filter(r => r.status === 'active').length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">High Risk</p>
              <p className="text-2xl font-bold text-slate-800">
                {records.filter(r => r.riskLevel === 'high' || r.riskLevel === 'extreme').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">With Photos</p>
              <p className="text-2xl font-bold text-slate-800">
                {records.filter(r => r.photos.length > 0).length}
              </p>
            </div>
            <Camera className="h-8 w-8 text-purple-500" />
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
              placeholder="Search by name, ID, or alias..."
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
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="deceased">Deceased</option>
              <option value="deported">Deported</option>
            </select>
          </div>

          {/* Risk Filter */}
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="extreme">Extreme Risk</option>
          </select>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {record.photos.length > 0 ? (
                    <img
                      src={record.photos[0].url}
                      alt={`${record.personalInfo.firstName} ${record.personalInfo.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {record.personalInfo.firstName} {record.personalInfo.lastName}
                    </h3>
                    {record.personalInfo.alias && record.personalInfo.alias.length > 0 && (
                      <p className="text-sm text-slate-600">
                        AKA: {record.personalInfo.alias.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(record.riskLevel)}`}>
                    {record.riskLevel.toUpperCase()} RISK
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span>DOB: {format(record.personalInfo.dateOfBirth, 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <FileText className="h-4 w-4" />
                  <span>ID: {record.personalInfo.nationalId || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {record.addresses.length > 0 
                      ? `${record.addresses[0].area}, ${record.addresses[0].district}`
                      : 'No address on file'
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{record.criminalHistory.length} Criminal Record(s)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {record.photos.length > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Camera className="h-3 w-3" />
                        <span>{record.photos.length}</span>
                      </div>
                    )}
                    {record.fingerprints && record.fingerprints.length > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Fingerprint className="h-3 w-3" />
                        <span>{record.fingerprints.length}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No criminal records found matching your criteria.</p>
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">Criminal Record Details</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Photo and Basic Info */}
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    {selectedRecord.photos.length > 0 ? (
                      <img
                        src={selectedRecord.photos[0].url}
                        alt={`${selectedRecord.personalInfo.firstName} ${selectedRecord.personalInfo.lastName}`}
                        className="w-32 h-32 rounded-lg object-cover mx-auto mb-4"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-slate-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <User className="h-16 w-16 text-slate-400" />
                      </div>
                    )}
                    <h4 className="text-lg font-semibold text-slate-800">
                      {selectedRecord.personalInfo.firstName} {selectedRecord.personalInfo.lastName}
                    </h4>
                    {selectedRecord.personalInfo.alias && selectedRecord.personalInfo.alias.length > 0 && (
                      <p className="text-sm text-slate-600">
                        AKA: {selectedRecord.personalInfo.alias.join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Risk Level:</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getRiskColor(selectedRecord.riskLevel)}`}>
                        {selectedRecord.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Date of Birth:</span> {format(selectedRecord.personalInfo.dateOfBirth, 'PPP')}</p>
                        <p><span className="font-medium">Place of Birth:</span> {selectedRecord.personalInfo.placeOfBirth}</p>
                        <p><span className="font-medium">Gender:</span> {selectedRecord.personalInfo.gender}</p>
                        <p><span className="font-medium">Nationality:</span> {selectedRecord.personalInfo.nationality}</p>
                        <p><span className="font-medium">National ID:</span> {selectedRecord.personalInfo.nationalId || 'Not provided'}</p>
                        <p><span className="font-medium">Marital Status:</span> {selectedRecord.personalInfo.maritalStatus}</p>
                        <p><span className="font-medium">Occupation:</span> {selectedRecord.personalInfo.occupation || 'Not provided'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Physical Description</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Height:</span> {selectedRecord.physicalDescription.height}</p>
                        <p><span className="font-medium">Weight:</span> {selectedRecord.physicalDescription.weight}</p>
                        <p><span className="font-medium">Eye Color:</span> {selectedRecord.physicalDescription.eyeColor}</p>
                        <p><span className="font-medium">Hair Color:</span> {selectedRecord.physicalDescription.hairColor}</p>
                        <p><span className="font-medium">Complexion:</span> {selectedRecord.physicalDescription.complexion}</p>
                        {selectedRecord.physicalDescription.distinguishingMarks && selectedRecord.physicalDescription.distinguishingMarks.length > 0 && (
                          <p><span className="font-medium">Distinguishing Marks:</span> {selectedRecord.physicalDescription.distinguishingMarks.join(', ')}</p>
                        )}
                        {selectedRecord.physicalDescription.tattoos && selectedRecord.physicalDescription.tattoos.length > 0 && (
                          <p><span className="font-medium">Tattoos:</span> {selectedRecord.physicalDescription.tattoos.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Criminal History */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Criminal History</h4>
                    {selectedRecord.criminalHistory.length > 0 ? (
                      <div className="space-y-3">
                        {selectedRecord.criminalHistory.map((entry) => (
                          <div key={entry.id} className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{entry.caseNumber}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                entry.status === 'convicted' ? 'bg-red-100 text-red-800' :
                                entry.status === 'acquitted' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {entry.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">
                              <span className="font-medium">Charges:</span> {entry.charges.join(', ')}
                            </p>
                            <p className="text-sm text-slate-600 mb-2">
                              <span className="font-medium">Arrest Date:</span> {format(entry.arrestDate, 'PPP')}
                            </p>
                            {entry.verdict && (
                              <p className="text-sm text-slate-600 mb-2">
                                <span className="font-medium">Verdict:</span> {entry.verdict}
                              </p>
                            )}
                            {entry.sentence && (
                              <p className="text-sm text-slate-600">
                                <span className="font-medium">Sentence:</span> {entry.sentence}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">No criminal history on record.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddRecord}
      />
    </div>
  );
};

export default CriminalRecordsList;