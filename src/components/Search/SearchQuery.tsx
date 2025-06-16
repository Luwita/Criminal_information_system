import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Save, 
  Clock, 
  Star,
  FileText,
  Users,
  Building2,
  Calendar,
  MapPin,
  AlertTriangle,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { SearchQuery as SearchQueryType, CriminalCase, CriminalRecord } from '../../types';
import { savedSearches, criminalCases, criminalRecords } from '../../data/mockData';
import { format } from 'date-fns';

const SearchQuery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'cases' | 'criminals' | 'all'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [location, setLocation] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedQueries, setSavedQueries] = useState<SearchQueryType[]>(savedSearches);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [queryName, setQueryName] = useState('');
  const [queryDescription, setQueryDescription] = useState('');

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let searchResults: any[] = [];
    
    // Search in cases
    if (searchType === 'cases' || searchType === 'all') {
      const caseResults = criminalCases.filter(case_ => {
        const matchesText = !searchTerm || 
          case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          case_.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = !location || 
          case_.location.toLowerCase().includes(location.toLowerCase());
        
        const matchesCrimeType = !crimeType || case_.crimeType === crimeType;
        
        const matchesDateFrom = !dateFrom || case_.reportedDate >= new Date(dateFrom);
        const matchesDateTo = !dateTo || case_.reportedDate <= new Date(dateTo);
        
        return matchesText && matchesLocation && matchesCrimeType && matchesDateFrom && matchesDateTo;
      });
      
      searchResults.push(...caseResults.map(case_ => ({ ...case_, type: 'case' })));
    }
    
    // Search in criminal records
    if (searchType === 'criminals' || searchType === 'all') {
      const criminalResults = criminalRecords.filter(record => {
        const fullName = `${record.personalInfo.firstName} ${record.personalInfo.lastName}`.toLowerCase();
        const matchesText = !searchTerm || 
          fullName.includes(searchTerm.toLowerCase()) ||
          record.personalInfo.nationalId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.personalInfo.alias?.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesLocation = !location || 
          record.addresses.some(addr => 
            addr.area.toLowerCase().includes(location.toLowerCase()) ||
            addr.district.toLowerCase().includes(location.toLowerCase())
          );
        
        return matchesText && matchesLocation;
      });
      
      searchResults.push(...criminalResults.map(record => ({ ...record, type: 'criminal' })));
    }
    
    setResults(searchResults);
    setIsSearching(false);
  };

  const handleSaveQuery = () => {
    const newQuery: SearchQueryType = {
      id: `search-${Date.now()}`,
      name: queryName,
      description: queryDescription,
      query: searchTerm,
      filters: {
        dateRange: dateFrom && dateTo ? {
          from: new Date(dateFrom),
          to: new Date(dateTo)
        } : undefined,
        locations: location ? [location] : undefined,
        crimeTypes: crimeType ? [crimeType as any] : undefined
      },
      createdBy: 'current-user',
      createdAt: new Date(),
      isPublic: false
    };
    
    setSavedQueries([...savedQueries, newQuery]);
    setShowSaveModal(false);
    setQueryName('');
    setQueryDescription('');
  };

  const loadSavedQuery = (query: SearchQueryType) => {
    setSearchTerm(query.query);
    if (query.filters.dateRange) {
      setDateFrom(format(query.filters.dateRange.from, 'yyyy-MM-dd'));
      setDateTo(format(query.filters.dateRange.to, 'yyyy-MM-dd'));
    }
    if (query.filters.locations && query.filters.locations.length > 0) {
      setLocation(query.filters.locations[0]);
    }
    if (query.filters.crimeTypes && query.filters.crimeTypes.length > 0) {
      setCrimeType(query.filters.crimeTypes[0]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Search & Query</h2>
          <p className="text-slate-600">Advanced search across cases and criminal records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Input */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Search Query</h3>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter search terms (name, case number, description, etc.)"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as any)}
                >
                  <option value="all">All Records</option>
                  <option value="cases">Cases Only</option>
                  <option value="criminals">Criminal Records Only</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Location"
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                
                <select
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={crimeType}
                  onChange={(e) => setCrimeType(e.target.value)}
                >
                  <option value="">All Crime Types</option>
                  <option value="theft">Theft</option>
                  <option value="burglary">Burglary</option>
                  <option value="robbery">Robbery</option>
                  <option value="assault">Assault</option>
                  <option value="fraud">Fraud</option>
                  <option value="drug_related">Drug Related</option>
                  <option value="domestic_violence">Domestic Violence</option>
                  <option value="murder">Murder</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date From</label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date To</label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span>{isSearching ? 'Searching...' : 'Search'}</span>
                </button>
                
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Query</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Search Results ({results.length})
              </h3>
              {results.length > 0 && (
                <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              )}
            </div>
            
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {result.type === 'case' ? (
                            <FileText className="h-5 w-5 text-blue-500" />
                          ) : (
                            <Users className="h-5 w-5 text-green-500" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.type === 'case' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {result.type === 'case' ? 'CASE' : 'CRIMINAL RECORD'}
                          </span>
                        </div>
                        
                        {result.type === 'case' ? (
                          <div>
                            <h4 className="font-semibold text-slate-800">{result.caseNumber}: {result.title}</h4>
                            <p className="text-sm text-slate-600 mt-1">{result.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{result.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{format(result.reportedDate, 'MMM dd, yyyy')}</span>
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                result.status === 'solved' ? 'bg-green-100 text-green-700' :
                                result.status === 'under_investigation' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {result.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-semibold text-slate-800">
                              {result.personalInfo.firstName} {result.personalInfo.lastName}
                            </h4>
                            {result.personalInfo.alias && result.personalInfo.alias.length > 0 && (
                              <p className="text-sm text-slate-600">AKA: {result.personalInfo.alias.join(', ')}</p>
                            )}
                            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                              <span>ID: {result.personalInfo.nationalId || 'Not provided'}</span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>DOB: {format(result.personalInfo.dateOfBirth, 'MMM dd, yyyy')}</span>
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                result.riskLevel === 'high' || result.riskLevel === 'extreme' ? 'bg-red-100 text-red-700' :
                                result.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {result.riskLevel.toUpperCase()} RISK
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">
                  {isSearching ? 'Searching...' : 'Enter search criteria and click Search to find records'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Queries */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Saved Queries</h3>
            
            <div className="space-y-3">
              {savedQueries.map((query) => (
                <div key={query.id} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{query.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">{query.description}</p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{format(query.createdAt, 'MMM dd, yyyy')}</span>
                        {query.isPublic && (
                          <span className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>Public</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => loadSavedQuery(query)}
                        className="p-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Load Query"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <button className="p-1 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Filters</h3>
            
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">High Priority Cases</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Recent Cases (7 days)</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">High Risk Criminals</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Cases in My Area</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Query Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Save Search Query</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Query Name</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={queryName}
                  onChange={(e) => setQueryName(e.target.value)}
                  placeholder="Enter a name for this query"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  value={queryDescription}
                  onChange={(e) => setQueryDescription(e.target.value)}
                  placeholder="Describe what this query searches for"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuery}
                  disabled={!queryName.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Save Query
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchQuery;