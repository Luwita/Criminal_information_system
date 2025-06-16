import React, { useState } from 'react';
import { X, FileText, Save, Calendar, MapPin, User, AlertTriangle } from 'lucide-react';
import { CriminalCase, CrimeType, CaseSeverity } from '../../types';
import { policeStations, users } from '../../data/mockData';

interface AddCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (caseData: Omit<CriminalCase, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
}

const AddCaseModal: React.FC<AddCaseModalProps> = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    caseNumber: '',
    title: '',
    description: '',
    crimeType: 'theft' as CrimeType,
    severity: 'medium' as CaseSeverity,
    status: 'reported' as const,
    reportedDate: new Date().toISOString().split('T')[0],
    incidentDate: new Date().toISOString().split('T')[0],
    location: '',
    stationId: '',
    assignedOfficer: '',
    investigatingOfficer: '',
    victim: {
      name: '',
      age: '',
      gender: 'Male' as 'Male' | 'Female',
      address: '',
      phoneNumber: '',
      relationship: ''
    },
    witness: {
      name: '',
      age: '',
      gender: 'Male' as 'Male' | 'Female',
      address: '',
      phoneNumber: '',
      statement: ''
    },
    evidence: {
      type: '',
      description: '',
      location: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateCaseNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `LSK/${year}/${month}${random}`;
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Case title is required';
      if (!formData.description.trim()) newErrors.description = 'Case description is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.stationId) newErrors.stationId = 'Police station is required';
    }

    if (step === 2) {
      if (!formData.assignedOfficer) newErrors.assignedOfficer = 'Assigned officer is required';
      if (!formData.victim.name.trim()) newErrors.victimName = 'Victim name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const caseData: Omit<CriminalCase, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> = {
        caseNumber: formData.caseNumber || generateCaseNumber(),
        title: formData.title,
        description: formData.description,
        crimeType: formData.crimeType,
        severity: formData.severity,
        status: formData.status,
        reportedDate: new Date(formData.reportedDate),
        incidentDate: new Date(formData.incidentDate),
        location: formData.location,
        stationId: formData.stationId,
        assignedOfficer: formData.assignedOfficer,
        investigatingOfficer: formData.investigatingOfficer || formData.assignedOfficer,
        suspects: [],
        victims: formData.victim.name ? [{
          id: `vic-${Date.now()}`,
          name: formData.victim.name,
          age: formData.victim.age ? parseInt(formData.victim.age) : undefined,
          gender: formData.victim.gender,
          address: formData.victim.address,
          phoneNumber: formData.victim.phoneNumber,
          relationship: formData.victim.relationship
        }] : [],
        witnesses: formData.witness.name ? [{
          id: `wit-${Date.now()}`,
          name: formData.witness.name,
          age: formData.witness.age ? parseInt(formData.witness.age) : undefined,
          gender: formData.witness.gender,
          address: formData.witness.address,
          phoneNumber: formData.witness.phoneNumber,
          relationship: 'Witness',
          statement: formData.witness.statement,
          contactedDate: new Date(),
          isReliable: true
        }] : [],
        evidence: formData.evidence.type ? [{
          id: `ev-${Date.now()}`,
          type: formData.evidence.type,
          description: formData.evidence.description,
          collectedDate: new Date(),
          collectedBy: 'Current User',
          location: formData.evidence.location,
          chain_of_custody: [],
          status: 'collected'
        }] : [],
        updates: [{
          id: `upd-${Date.now()}`,
          caseId: '',
          updatedBy: 'current-user',
          updateType: 'general_update',
          description: 'Case created',
          date: new Date()
        }]
      };

      onSave(caseData);
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      caseNumber: '',
      title: '',
      description: '',
      crimeType: 'theft',
      severity: 'medium',
      status: 'reported',
      reportedDate: new Date().toISOString().split('T')[0],
      incidentDate: new Date().toISOString().split('T')[0],
      location: '',
      stationId: '',
      assignedOfficer: '',
      investigatingOfficer: '',
      victim: {
        name: '',
        age: '',
        gender: 'Male',
        address: '',
        phoneNumber: '',
        relationship: ''
      },
      witness: {
        name: '',
        age: '',
        gender: 'Male',
        address: '',
        phoneNumber: '',
        statement: ''
      },
      evidence: {
        type: '',
        description: '',
        location: ''
      }
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-800">Create New Case</h3>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <div className="text-sm text-slate-600">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Case Details' :
                currentStep === 2 ? 'People Involved' :
                'Evidence & Review'
              }
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Case Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Case Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.caseNumber}
                    onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                    placeholder="Auto-generated if empty"
                  />
                  <p className="text-xs text-slate-500 mt-1">Leave empty to auto-generate</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Crime Type *
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.crimeType}
                    onChange={(e) => setFormData({ ...formData, crimeType: e.target.value as CrimeType })}
                  >
                    <option value="theft">Theft</option>
                    <option value="burglary">Burglary</option>
                    <option value="robbery">Robbery</option>
                    <option value="assault">Assault</option>
                    <option value="fraud">Fraud</option>
                    <option value="drug_related">Drug Related</option>
                    <option value="domestic_violence">Domestic Violence</option>
                    <option value="murder">Murder</option>
                    <option value="traffic_violation">Traffic Violation</option>
                    <option value="cybercrime">Cybercrime</option>
                    <option value="corruption">Corruption</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Case Title *
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter a descriptive case title"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Case Description *
                  </label>
                  <textarea
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-300' : 'border-slate-300'
                    }`}
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide detailed description of the incident"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Incident Date *
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Reported Date *
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.reportedDate}
                    onChange={(e) => setFormData({ ...formData, reportedDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.location ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter incident location"
                  />
                  {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Police Station *
                  </label>
                  <select
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.stationId ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.stationId}
                    onChange={(e) => setFormData({ ...formData, stationId: e.target.value })}
                  >
                    <option value="">Select Police Station</option>
                    {policeStations.map(station => (
                      <option key={station.id} value={station.id}>{station.name}</option>
                    ))}
                  </select>
                  {errors.stationId && <p className="text-red-600 text-sm mt-1">{errors.stationId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Severity Level
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value as CaseSeverity })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Case Status
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="reported">Reported</option>
                    <option value="under_investigation">Under Investigation</option>
                    <option value="solved">Solved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: People Involved */}
          {currentStep === 2 && (
            <div className="space-y-8">
              {/* Officers */}
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Assigned Officers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Assigned Officer *
                    </label>
                    <select
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.assignedOfficer ? 'border-red-300' : 'border-slate-300'
                      }`}
                      value={formData.assignedOfficer}
                      onChange={(e) => setFormData({ ...formData, assignedOfficer: e.target.value })}
                    >
                      <option value="">Select Officer</option>
                      {users.filter(user => ['police_officer', 'detective', 'station_commander'].includes(user.role)).map(officer => (
                        <option key={officer.id} value={officer.id}>{officer.name} - {officer.role.replace('_', ' ')}</option>
                      ))}
                    </select>
                    {errors.assignedOfficer && <p className="text-red-600 text-sm mt-1">{errors.assignedOfficer}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Investigating Officer
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.investigatingOfficer}
                      onChange={(e) => setFormData({ ...formData, investigatingOfficer: e.target.value })}
                    >
                      <option value="">Select Officer (Optional)</option>
                      {users.filter(user => ['detective', 'police_officer'].includes(user.role)).map(officer => (
                        <option key={officer.id} value={officer.id}>{officer.name} - {officer.role.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Victim Information */}
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Victim Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Victim Name *
                    </label>
                    <input
                      type="text"
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.victimName ? 'border-red-300' : 'border-slate-300'
                      }`}
                      value={formData.victim.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        victim: { ...formData.victim, name: e.target.value }
                      })}
                      placeholder="Enter victim's full name"
                    />
                    {errors.victimName && <p className="text-red-600 text-sm mt-1">{errors.victimName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.victim.age}
                      onChange={(e) => setFormData({
                        ...formData,
                        victim: { ...formData.victim, age: e.target.value }
                      })}
                      placeholder="Age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.victim.gender}
                      onChange={(e) => setFormData({
                        ...formData,
                        victim: { ...formData.victim, gender: e.target.value as 'Male' | 'Female' }
                      })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.victim.phoneNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        victim: { ...formData.victim, phoneNumber: e.target.value }
                      })}
                      placeholder="+260-XXX-XXX-XXX"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.victim.address}
                      onChange={(e) => setFormData({
                        ...formData,
                        victim: { ...formData.victim, address: e.target.value }
                      })}
                      placeholder="Enter victim's address"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Relationship to Case
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.victim.relationship}
                      onChange={(e) => setFormData({
                        ...formData,
                        victim: { ...formData.victim, relationship: e.target.value }
                      })}
                      placeholder="e.g., Property Owner, Direct Victim"
                    />
                  </div>
                </div>
              </div>

              {/* Witness Information */}
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Witness Information (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Witness Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.witness.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        witness: { ...formData.witness, name: e.target.value }
                      })}
                      placeholder="Enter witness name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.witness.phoneNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        witness: { ...formData.witness, phoneNumber: e.target.value }
                      })}
                      placeholder="+260-XXX-XXX-XXX"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Witness Statement
                    </label>
                    <textarea
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      value={formData.witness.statement}
                      onChange={(e) => setFormData({
                        ...formData,
                        witness: { ...formData.witness, statement: e.target.value }
                      })}
                      placeholder="Enter witness statement"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Evidence & Review */}
          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Evidence Information */}
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Evidence Information (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Evidence Type
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.evidence.type}
                      onChange={(e) => setFormData({
                        ...formData,
                        evidence: { ...formData.evidence, type: e.target.value }
                      })}
                      placeholder="e.g., Fingerprints, CCTV Footage, Physical Evidence"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Collection Location
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.evidence.location}
                      onChange={(e) => setFormData({
                        ...formData,
                        evidence: { ...formData.evidence, location: e.target.value }
                      })}
                      placeholder="Where evidence was collected"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Evidence Description
                    </label>
                    <textarea
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      value={formData.evidence.description}
                      onChange={(e) => setFormData({
                        ...formData,
                        evidence: { ...formData.evidence, description: e.target.value }
                      })}
                      placeholder="Detailed description of the evidence"
                    />
                  </div>
                </div>
              </div>

              {/* Case Summary */}
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Case Summary</h4>
                <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Case Number:</span>
                      <p className="text-slate-600">{formData.caseNumber || 'Auto-generated'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Crime Type:</span>
                      <p className="text-slate-600 capitalize">{formData.crimeType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Title:</span>
                      <p className="text-slate-600">{formData.title}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Severity:</span>
                      <p className="text-slate-600 capitalize">{formData.severity}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Location:</span>
                      <p className="text-slate-600">{formData.location}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Incident Date:</span>
                      <p className="text-slate-600">{formData.incidentDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Victim:</span>
                      <p className="text-slate-600">{formData.victim.name || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Assigned Officer:</span>
                      <p className="text-slate-600">
                        {formData.assignedOfficer ? 
                          users.find(u => u.id === formData.assignedOfficer)?.name || 'Unknown' : 
                          'Not assigned'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-slate-700">Description:</span>
                    <p className="text-slate-600 mt-1">{formData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Create Case</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCaseModal;