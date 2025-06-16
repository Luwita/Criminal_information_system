import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  CheckCircle, 
  XCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building2,
  Key,
  UserCheck,
  UserX
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { users, policeStations } from '../../data/mockData';
import { format } from 'date-fns';

const UserManagement: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'police_officer' as UserRole,
    stationId: '',
    province: '',
    district: '',
    isActive: true
  });

  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.isActive) ||
                         (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'provincial_admin':
        return 'bg-blue-100 text-blue-800';
      case 'district_admin':
        return 'bg-green-100 text-green-800';
      case 'station_commander':
        return 'bg-orange-100 text-orange-800';
      case 'detective':
        return 'bg-red-100 text-red-800';
      case 'police_officer':
        return 'bg-yellow-100 text-yellow-800';
      case 'data_entry_clerk':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="h-4 w-4" />;
      case 'provincial_admin':
      case 'district_admin':
        return <Building2 className="h-4 w-4" />;
      case 'station_commander':
        return <UserCheck className="h-4 w-4" />;
      case 'detective':
        return <Eye className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const handleCreateUser = () => {
    const user: User = {
      id: `user-${Date.now()}`,
      ...newUser,
      createdAt: new Date(),
      lastLogin: undefined
    };
    
    setUsersList([...usersList, user]);
    setShowNewUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'police_officer',
      stationId: '',
      province: '',
      district: '',
      isActive: true
    });
  };

  const handleEditUser = () => {
    if (editingUser) {
      setUsersList(usersList.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setShowEditModal(false);
      setEditingUser(null);
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsersList(usersList.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsersList(usersList.filter(user => user.id !== userId));
    }
  };

  const getStationName = (stationId?: string) => {
    if (!stationId) return 'Not assigned';
    const station = policeStations.find(s => s.id === stationId);
    return station ? station.name : 'Unknown Station';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-600">Manage system users and permissions</p>
        </div>
        <button 
          onClick={() => setShowNewUserModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-800">{usersList.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Users</p>
              <p className="text-2xl font-bold text-slate-800">
                {usersList.filter(u => u.isActive).length}
              </p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Administrators</p>
              <p className="text-2xl font-bold text-slate-800">
                {usersList.filter(u => u.role.includes('admin')).length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Inactive Users</p>
              <p className="text-2xl font-bold text-slate-800">
                {usersList.filter(u => !u.isActive).length}
              </p>
            </div>
            <UserX className="h-8 w-8 text-red-500" />
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
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="provincial_admin">Provincial Admin</option>
              <option value="district_admin">District Admin</option>
              <option value="station_commander">Station Commander</option>
              <option value="detective">Detective</option>
              <option value="police_officer">Police Officer</option>
              <option value="data_entry_clerk">Data Entry Clerk</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-700">User</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Role</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Station/Location</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Last Login</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span>{user.role.replace('_', ' ').toUpperCase()}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <p className="font-medium text-slate-800">{getStationName(user.stationId)}</p>
                      {user.province && (
                        <p className="text-slate-600">{user.district}, {user.province}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {user.isActive ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        user.isActive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-600">
                      {user.lastLogin ? (
                        <div>
                          <p>{format(user.lastLogin, 'MMM dd, yyyy')}</p>
                          <p className="text-xs">{format(user.lastLogin, 'HH:mm')}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400">Never</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.isActive 
                            ? 'text-slate-600 hover:text-orange-600 hover:bg-orange-50' 
                            : 'text-slate-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title={user.isActive ? 'Deactivate User' : 'Activate User'}
                      >
                        {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* New User Modal */}
      {showNewUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as UserRole})}
                >
                  <option value="police_officer">Police Officer</option>
                  <option value="detective">Detective</option>
                  <option value="station_commander">Station Commander</option>
                  <option value="district_admin">District Admin</option>
                  <option value="provincial_admin">Provincial Admin</option>
                  <option value="data_entry_clerk">Data Entry Clerk</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Police Station</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newUser.stationId}
                  onChange={(e) => setNewUser({...newUser, stationId: e.target.value})}
                >
                  <option value="">Select Station</option>
                  {policeStations.map(station => (
                    <option key={station.id} value={station.id}>{station.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowNewUserModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateUser}
                  disabled={!newUser.name || !newUser.email}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-white">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-800">{selectedUser.name}</h4>
                  <p className="text-slate-600">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(selectedUser.role)}`}>
                      {getRoleIcon(selectedUser.role)}
                      <span>{selectedUser.role.replace('_', ' ').toUpperCase()}</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-slate-800 mb-3">Account Information</h5>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">User ID:</span> {selectedUser.id}</p>
                    <p><span className="font-medium">Created:</span> {format(selectedUser.createdAt, 'PPP')}</p>
                    <p><span className="font-medium">Last Login:</span> {
                      selectedUser.lastLogin ? format(selectedUser.lastLogin, 'PPP p') : 'Never'
                    }</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-slate-800 mb-3">Assignment Details</h5>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Station:</span> {getStationName(selectedUser.stationId)}</p>
                    {selectedUser.province && (
                      <p><span className="font-medium">Province:</span> {selectedUser.province}</p>
                    )}
                    {selectedUser.district && (
                      <p><span className="font-medium">District:</span> {selectedUser.district}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;