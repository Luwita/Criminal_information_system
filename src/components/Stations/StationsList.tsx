import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Building2,
  Eye,
  Edit
} from 'lucide-react';
import { PoliceStation, StationType } from '../../types';
import { policeStations, zambianProvinces } from '../../data/mockData';
import AddStationModal from './AddStationModal';

const StationsList: React.FC = () => {
  const [stations, setStations] = useState<PoliceStation[]>(policeStations);
  const [searchTerm, setSearchTerm] = useState('');
  const [provinceFilter, setProvinceFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<StationType | 'all'>('all');
  const [selectedStation, setSelectedStation] = useState<PoliceStation | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = provinceFilter === 'all' || station.province === provinceFilter;
    const matchesType = typeFilter === 'all' || station.type === typeFilter;
    
    return matchesSearch && matchesProvince && matchesType;
  });

  const handleAddStation = (stationData: Omit<PoliceStation, 'id'>) => {
    const newStation: PoliceStation = {
      ...stationData,
      id: `stn-${Date.now()}`
    };
    setStations([...stations, newStation]);
  };

  const getStationTypeIcon = (type: StationType) => {
    switch (type) {
      case 'headquarters':
        return '🏛️';
      case 'provincial_headquarters':
        return '🏢';
      case 'district_headquarters':
        return '🏬';
      case 'police_station':
        return '🚔';
      case 'police_post':
        return '🏪';
      default:
        return '🏢';
    }
  };

  const getStationTypeColor = (type: StationType) => {
    switch (type) {
      case 'headquarters':
        return 'bg-purple-100 text-purple-800';
      case 'provincial_headquarters':
        return 'bg-blue-100 text-blue-800';
      case 'district_headquarters':
        return 'bg-green-100 text-green-800';
      case 'police_station':
        return 'bg-yellow-100 text-yellow-800';
      case 'police_post':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Police Stations</h2>
          <p className="text-slate-600">Manage police stations across Zambia</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Station</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Stations</p>
              <p className="text-2xl font-bold text-slate-800">{stations.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Officers</p>
              <p className="text-2xl font-bold text-slate-800">
                {stations.reduce((sum, station) => sum + station.officerCount, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Provinces</p>
              <p className="text-2xl font-bold text-slate-800">{zambianProvinces.length}</p>
            </div>
            <MapPin className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Stations</p>
              <p className="text-2xl font-bold text-slate-800">
                {stations.filter(s => s.isActive).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
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
              placeholder="Search stations by name, code, or district..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Province Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={provinceFilter}
              onChange={(e) => setProvinceFilter(e.target.value)}
            >
              <option value="all">All Provinces</option>
              {zambianProvinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as StationType | 'all')}
          >
            <option value="all">All Types</option>
            <option value="headquarters">Headquarters</option>
            <option value="provincial_headquarters">Provincial HQ</option>
            <option value="district_headquarters">District HQ</option>
            <option value="police_station">Police Station</option>
            <option value="police_post">Police Post</option>
          </select>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStations.map((station) => (
          <div key={station.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getStationTypeIcon(station.type)}</span>
                  <div>
                    <h3 className="font-semibold text-slate-800">{station.name}</h3>
                    <p className="text-sm text-slate-600">{station.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStationTypeColor(station.type)}`}>
                    {station.type.replace('_', ' ').toUpperCase()}
                  </span>
                  {station.isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>{station.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4" />
                  <span>{station.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>{station.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Users className="h-4 w-4" />
                  <span>{station.officerCount} Officers</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{station.commanderName}</p>
                    <p className="text-xs text-slate-600">Station Commander</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedStation(station)}
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

      {filteredStations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No stations found matching your criteria.</p>
        </div>
      )}

      {/* Station Detail Modal */}
      {selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">Station Details</h3>
                <button
                  onClick={() => setSelectedStation(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedStation.name}</p>
                    <p><span className="font-medium">Code:</span> {selectedStation.code}</p>
                    <p><span className="font-medium">Type:</span> {selectedStation.type.replace('_', ' ')}</p>
                    <p><span className="font-medium">Province:</span> {selectedStation.province}</p>
                    <p><span className="font-medium">District:</span> {selectedStation.district}</p>
                    <p><span className="font-medium">Status:</span> {selectedStation.isActive ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Address:</span> {selectedStation.address}</p>
                    <p><span className="font-medium">Phone:</span> {selectedStation.phone}</p>
                    <p><span className="font-medium">Email:</span> {selectedStation.email}</p>
                    <p><span className="font-medium">Commander:</span> {selectedStation.commanderName}</p>
                    <p><span className="font-medium">Officers:</span> {selectedStation.officerCount}</p>
                  </div>
                </div>
              </div>
              
              {selectedStation.coordinates && (
                <div className="mt-6">
                  <h4 className="font-semibold text-slate-800 mb-3">Location</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Coordinates:</span> 
                      {selectedStation.coordinates.lat}, {selectedStation.coordinates.lng}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Station Modal */}
      <AddStationModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddStation}
      />
    </div>
  );
};

export default StationsList;