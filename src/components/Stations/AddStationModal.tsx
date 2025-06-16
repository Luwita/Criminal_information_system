import React, { useState } from 'react';
import { X, Building2, MapPin, Phone, Mail, User, Save } from 'lucide-react';
import { PoliceStation, StationType } from '../../types';
import { zambianProvinces } from '../../data/mockData';

interface AddStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (station: Omit<PoliceStation, 'id'>) => void;
}

const AddStationModal: React.FC<AddStationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'police_station' as StationType,
    province: '',
    district: '',
    address: '',
    phone: '',
    email: '',
    commanderName: '',
    officerCount: 0,
    isActive: true,
    coordinates: {
      lat: 0,
      lng: 0
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Station name is required';
    if (!formData.code.trim()) newErrors.code = 'Station code is required';
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.commanderName.trim()) newErrors.commanderName = 'Commander name is required';
    if (formData.officerCount < 1) newErrors.officerCount = 'Officer count must be at least 1';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+260-\d{3}-\d{3}-\d{3}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone format: +260-XXX-XXX-XXX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      code: '',
      type: 'police_station',
      province: '',
      district: '',
      address: '',
      phone: '',
      email: '',
      commanderName: '',
      officerCount: 0,
      isActive: true,
      coordinates: { lat: 0, lng: 0 }
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-800">Add New Police Station</h3>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="text-lg font-medium text-slate-800 mb-4">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Station Name *
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter station name"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Station Code *
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.code ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., LSK-CEN"
                />
                {errors.code && <p className="text-red-600 text-sm mt-1">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Station Type *
                </label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as StationType })}
                >
                  <option value="police_post">Police Post</option>
                  <option value="police_station">Police Station</option>
                  <option value="district_headquarters">District Headquarters</option>
                  <option value="provincial_headquarters">Provincial Headquarters</option>
                  <option value="headquarters">National Headquarters</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Officer Count *
                </label>
                <input
                  type="number"
                  min="1"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.officerCount ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.officerCount}
                  onChange={(e) => setFormData({ ...formData, officerCount: parseInt(e.target.value) || 0 })}
                />
                {errors.officerCount && <p className="text-red-600 text-sm mt-1">{errors.officerCount}</p>}
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h4 className="text-lg font-medium text-slate-800 mb-4">Location Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Province *
                </label>
                <select
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.province ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                >
                  <option value="">Select Province</option>
                  {zambianProvinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                {errors.province && <p className="text-red-600 text-sm mt-1">{errors.province}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  District *
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.district ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="Enter district"
                />
                {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Address *
                </label>
                <textarea
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address ? 'border-red-300' : 'border-slate-300'
                  }`}
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-medium text-slate-800 mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+260-XXX-XXX-XXX"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="station@zambiapolice.gov.zm"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Station Commander *
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.commanderName ? 'border-red-300' : 'border-slate-300'
                  }`}
                  value={formData.commanderName}
                  onChange={(e) => setFormData({ ...formData, commanderName: e.target.value })}
                  placeholder="Enter commander's full name"
                />
                {errors.commanderName && <p className="text-red-600 text-sm mt-1">{errors.commanderName}</p>}
              </div>
            </div>
          </div>

          {/* Coordinates (Optional) */}
          <div>
            <h4 className="text-lg font-medium text-slate-800 mb-4">GPS Coordinates (Optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.coordinates.lat}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    coordinates: { ...formData.coordinates, lat: parseFloat(e.target.value) || 0 }
                  })}
                  placeholder="e.g., -15.4067"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.coordinates.lng}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    coordinates: { ...formData.coordinates, lng: parseFloat(e.target.value) || 0 }
                  })}
                  placeholder="e.g., 28.2833"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Station is active</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Add Station</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStationModal;