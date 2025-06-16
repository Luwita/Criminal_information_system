import React, { useState } from 'react';
import { X, User, Save, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { CriminalRecord } from '../../types';
import { zambianProvinces } from '../../data/mockData';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Omit<CriminalRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
}

const AddRecordModal: React.FC<AddRecordModalProps> = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      middleName: '',
      alias: [] as string[],
      dateOfBirth: '',
      placeOfBirth: '',
      gender: 'Male' as 'Male' | 'Female',
      nationality: 'Zambian',
      nationalId: '',
      passportNumber: '',
      maritalStatus: 'Single',
      occupation: '',
      education: ''
    },
    physicalDescription: {
      height: '',
      weight: '',
      eyeColor: '',
      hairColor: '',
      complexion: '',
      distinguishingMarks: [] as string[],
      scars: [] as string[],
      tattoos: [] as string[]
    },
    address: {
      street: '',
      area: '',
      district: '',
      province: '',
      country: 'Zambia'
    },
    contact: {
      phone: '',
      email: ''
    },
    riskLevel: 'low' as 'low' | 'medium' | 'high' | 'extreme',
    status: 'active' as 'active' | 'inactive' | 'deceased' | 'deported'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [aliasInput, setAliasInput] = useState('');
  const [markInput, setMarkInput] = useState('');
  const [scarInput, setScarInput] = useState('');
  const [tattooInput, setTattooInput] = useState('');

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.personalInfo.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.personalInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.personalInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.personalInfo.placeOfBirth.trim()) newErrors.placeOfBirth = 'Place of birth is required';
    }

    if (step === 2) {
      if (!formData.physicalDescription.height.trim()) newErrors.height = 'Height is required';
      if (!formData.physicalDescription.weight.trim()) newErrors.weight = 'Weight is required';
      if (!formData.physicalDescription.eyeColor.trim()) newErrors.eyeColor = 'Eye color is required';
      if (!formData.physicalDescription.hairColor.trim()) newErrors.hairColor = 'Hair color is required';
      if (!formData.physicalDescription.complexion.trim()) newErrors.complexion = 'Complexion is required';
    }

    if (step === 3) {
      if (!formData.address.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.address.area.trim()) newErrors.area = 'Area is required';
      if (!formData.address.district.trim()) newErrors.district = 'District is required';
      if (!formData.address.province) newErrors.province = 'Province is required';
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
      const record: Omit<CriminalRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> = {
        personalInfo: {
          ...formData.personalInfo,
          dateOfBirth: new Date(formData.personalInfo.dateOfBirth),
          alias: formData.personalInfo.alias.length > 0 ? formData.personalInfo.alias : undefined
        },
        physicalDescription: {
          ...formData.physicalDescription,
          distinguishingMarks: formData.physicalDescription.distinguishingMarks.length > 0 ? formData.physicalDescription.distinguishingMarks : undefined,
          scars: formData.physicalDescription.scars.length > 0 ? formData.physicalDescription.scars : undefined,
          tattoos: formData.physicalDescription.tattoos.length > 0 ? formData.physicalDescription.tattoos : undefined
        },
        addresses: [{
          id: `addr-${Date.now()}`,
          type: 'current',
          street: formData.address.street,
          area: formData.address.area,
          district: formData.address.district,
          province: formData.address.province,
          country: formData.address.country,
          isVerified: false,
          dateFrom: new Date()
        }],
        contacts: formData.contact.phone ? [{
          id: `cont-${Date.now()}`,
          type: 'phone',
          value: formData.contact.phone,
          isVerified: false,
          isPrimary: true
        }] : [],
        criminalHistory: [],
        photos: [],
        status: formData.status,
        riskLevel: formData.riskLevel
      };

      onSave(record);
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      personalInfo: {
        firstName: '',
        lastName: '',
        middleName: '',
        alias: [],
        dateOfBirth: '',
        placeOfBirth: '',
        gender: 'Male',
        nationality: 'Zambian',
        nationalId: '',
        passportNumber: '',
        maritalStatus: 'Single',
        occupation: '',
        education: ''
      },
      physicalDescription: {
        height: '',
        weight: '',
        eyeColor: '',
        hairColor: '',
        complexion: '',
        distinguishingMarks: [],
        scars: [],
        tattoos: []
      },
      address: {
        street: '',
        area: '',
        district: '',
        province: '',
        country: 'Zambia'
      },
      contact: {
        phone: '',
        email: ''
      },
      riskLevel: 'low',
      status: 'active'
    });
    setErrors({});
    onClose();
  };

  const addAlias = () => {
    if (aliasInput.trim() && !formData.personalInfo.alias.includes(aliasInput.trim())) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          alias: [...formData.personalInfo.alias, aliasInput.trim()]
        }
      });
      setAliasInput('');
    }
  };

  const removeAlias = (index: number) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        alias: formData.personalInfo.alias.filter((_, i) => i !== index)
      }
    });
  };

  const addMark = () => {
    if (markInput.trim() && !formData.physicalDescription.distinguishingMarks.includes(markInput.trim())) {
      setFormData({
        ...formData,
        physicalDescription: {
          ...formData.physicalDescription,
          distinguishingMarks: [...formData.physicalDescription.distinguishingMarks, markInput.trim()]
        }
      });
      setMarkInput('');
    }
  };

  const addScar = () => {
    if (scarInput.trim() && !formData.physicalDescription.scars.includes(scarInput.trim())) {
      setFormData({
        ...formData,
        physicalDescription: {
          ...formData.physicalDescription,
          scars: [...formData.physicalDescription.scars, scarInput.trim()]
        }
      });
      setScarInput('');
    }
  };

  const addTattoo = () => {
    if (tattooInput.trim() && !formData.physicalDescription.tattoos.includes(tattooInput.trim())) {
      setFormData({
        ...formData,
        physicalDescription: {
          ...formData.physicalDescription,
          tattoos: [...formData.physicalDescription.tattoos, tattooInput.trim()]
        }
      });
      setTattooInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-800">Add New Criminal Record</h3>
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
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
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
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Physical Description' :
                currentStep === 3 ? 'Address & Contact' :
                'Review & Submit'
              }
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.personalInfo.firstName}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, firstName: e.target.value }
                    })}
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.personalInfo.lastName}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, lastName: e.target.value }
                    })}
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.personalInfo.middleName}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, middleName: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.personalInfo.gender}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, gender: e.target.value as 'Male' | 'Female' }
                    })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dateOfBirth ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
                    })}
                  />
                  {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Place of Birth *
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.placeOfBirth ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.personalInfo.placeOfBirth}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, placeOfBirth: e.target.value }
                    })}
                  />
                  {errors.placeOfBirth && <p className="text-red-600 text-sm mt-1">{errors.placeOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    National ID
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.personalInfo.nationalId}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, nationalId: e.target.value }
                    })}
                    placeholder="123456/78/9"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Marital Status
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.personalInfo.maritalStatus}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, maritalStatus: e.target.value }
                    })}
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              {/* Aliases */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Known Aliases
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                    placeholder="Enter alias"
                    onKeyPress={(e) => e.key === 'Enter' && addAlias()}
                  />
                  <button
                    type="button"
                    onClick={addAlias}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.personalInfo.alias.map((alias, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{alias}</span>
                      <button
                        type="button"
                        onClick={() => removeAlias(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Physical Description */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Height *
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.height ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.physicalDescription.height}
                    onChange={(e) => setFormData({
                      ...formData,
                      physicalDescription: { ...formData.physicalDescription, height: e.target.value }
                    })}
                    placeholder="e.g., 175cm"
                  />
                  {errors.height && <p className="text-red-600 text-sm mt-1">{errors.height}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Weight *
                  </label>
                  <input
                    type="text"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.weight ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.physicalDescription.weight}
                    onChange={(e) => setFormData({
                      ...formData,
                      physicalDescription: { ...formData.physicalDescription, weight: e.target.value }
                    })}
                    placeholder="e.g., 70kg"
                  />
                  {errors.weight && <p className="text-red-600 text-sm mt-1">{errors.weight}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Eye Color *
                  </label>
                  <select
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.eyeColor ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.physicalDescription.eyeColor}
                    onChange={(e) => setFormData({
                      ...formData,
                      physicalDescription: { ...formData.physicalDescription, eyeColor: e.target.value }
                    })}
                  >
                    <option value="">Select eye color</option>
                    <option value="Brown">Brown</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Hazel">Hazel</option>
                    <option value="Gray">Gray</option>
                  </select>
                  {errors.eyeColor && <p className="text-red-600 text-sm mt-1">{errors.eyeColor}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Hair Color *
                  </label>
                  <select
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.hairColor ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.physicalDescription.hairColor}
                    onChange={(e) => setFormData({
                      ...formData,
                      physicalDescription: { ...formData.physicalDescription, hairColor: e.target.value }
                    })}
                  >
                    <option value="">Select hair color</option>
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="Blonde">Blonde</option>
                    <option value="Red">Red</option>
                    <option value="Gray">Gray</option>
                    <option value="White">White</option>
                    <option value="Bald">Bald</option>
                  </select>
                  {errors.hairColor && <p className="text-red-600 text-sm mt-1">{errors.hairColor}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Complexion *
                  </label>
                  <select
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.complexion ? 'border-red-300' : 'border-slate-300'
                    }`}
                    value={formData.physicalDescription.complexion}
                    onChange={(e) => setFormData({
                      ...formData,
                      physicalDescription: { ...formData.physicalDescription, complexion: e.target.value }
                    })}
                  >
                    <option value="">Select complexion</option>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Dark">Dark</option>
                    <option value="Very Dark">Very Dark</option>
                  </select>
                  {errors.complexion && <p className="text-red-600 text-sm mt-1">{errors.complexion}</p>}
                </div>
              </div>

              {/* Distinguishing Marks */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Distinguishing Marks
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={markInput}
                    onChange={(e) => setMarkInput(e.target.value)}
                    placeholder="Enter distinguishing mark"
                    onKeyPress={(e) => e.key === 'Enter' && addMark()}
                  />
                  <button
                    type="button"
                    onClick={addMark}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.physicalDescription.distinguishingMarks.map((mark, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{mark}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          physicalDescription: {
                            ...formData.physicalDescription,
                            distinguishingMarks: formData.physicalDescription.distinguishingMarks.filter((_, i) => i !== index)
                          }
                        })}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Scars */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Scars
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={scarInput}
                    onChange={(e) => setScarInput(e.target.value)}
                    placeholder="Enter scar description"
                    onKeyPress={(e) => e.key === 'Enter' && addScar()}
                  />
                  <button
                    type="button"
                    onClick={addScar}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.physicalDescription.scars.map((scar, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{scar}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          physicalDescription: {
                            ...formData.physicalDescription,
                            scars: formData.physicalDescription.scars.filter((_, i) => i !== index)
                          }
                        })}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tattoos */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tattoos
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={tattooInput}
                    onChange={(e) => setTattooInput(e.target.value)}
                    placeholder="Enter tattoo description"
                    onKeyPress={(e) => e.key === 'Enter' && addTattoo()}
                  />
                  <button
                    type="button"
                    onClick={addTattoo}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.physicalDescription.tattoos.map((tattoo, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{tattoo}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          physicalDescription: {
                            ...formData.physicalDescription,
                            tattoos: formData.physicalDescription.tattoos.filter((_, i) => i !== index)
                          }
                        })}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Address & Contact */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Address Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.street ? 'border-red-300' : 'border-slate-300'
                      }`}
                      value={formData.address.street}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, street: e.target.value }
                      })}
                      placeholder="Enter street address"
                    />
                    {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Area/Compound *
                    </label>
                    <input
                      type="text"
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.area ? 'border-red-300' : 'border-slate-300'
                      }`}
                      value={formData.address.area}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, area: e.target.value }
                      })}
                      placeholder="Enter area or compound"
                    />
                    {errors.area && <p className="text-red-600 text-sm mt-1">{errors.area}</p>}
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
                      value={formData.address.district}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, district: e.target.value }
                      })}
                      placeholder="Enter district"
                    />
                    {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Province *
                    </label>
                    <select
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.province ? 'border-red-300' : 'border-slate-300'
                      }`}
                      value={formData.address.province}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, province: e.target.value }
                      })}
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
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.address.country}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, country: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.contact.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value }
                      })}
                      placeholder="+260-XXX-XXX-XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.contact.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value }
                      })}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-slate-800 mb-4">Risk Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Risk Level
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.riskLevel}
                      onChange={(e) => setFormData({
                        ...formData,
                        riskLevel: e.target.value as 'low' | 'medium' | 'high' | 'extreme'
                      })}
                    >
                      <option value="low">Low Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="high">High Risk</option>
                      <option value="extreme">Extreme Risk</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.status}
                      onChange={(e) => setFormData({
                        ...formData,
                        status: e.target.value as 'active' | 'inactive' | 'deceased' | 'deported'
                      })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="deceased">Deceased</option>
                      <option value="deported">Deported</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-slate-800">Review Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-slate-700 mb-2">Personal Information</h5>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.middleName} {formData.personalInfo.lastName}</p>
                      <p><span className="font-medium">Gender:</span> {formData.personalInfo.gender}</p>
                      <p><span className="font-medium">Date of Birth:</span> {formData.personalInfo.dateOfBirth}</p>
                      <p><span className="font-medium">Place of Birth:</span> {formData.personalInfo.placeOfBirth}</p>
                      <p><span className="font-medium">National ID:</span> {formData.personalInfo.nationalId || 'Not provided'}</p>
                      <p><span className="font-medium">Marital Status:</span> {formData.personalInfo.maritalStatus}</p>
                      {formData.personalInfo.alias.length > 0 && (
                        <p><span className="font-medium">Aliases:</span> {formData.personalInfo.alias.join(', ')}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-slate-700 mb-2">Physical Description</h5>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Height:</span> {formData.physicalDescription.height}</p>
                      <p><span className="font-medium">Weight:</span> {formData.physicalDescription.weight}</p>
                      <p><span className="font-medium">Eye Color:</span> {formData.physicalDescription.eyeColor}</p>
                      <p><span className="font-medium">Hair Color:</span> {formData.physicalDescription.hairColor}</p>
                      <p><span className="font-medium">Complexion:</span> {formData.physicalDescription.complexion}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-slate-700 mb-2">Address</h5>
                    <div className="text-sm space-y-1">
                      <p>{formData.address.street}</p>
                      <p>{formData.address.area}, {formData.address.district}</p>
                      <p>{formData.address.province}, {formData.address.country}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-slate-700 mb-2">Contact</h5>
                    <div className="text-sm space-y-1">
                      {formData.contact.phone && <p><span className="font-medium">Phone:</span> {formData.contact.phone}</p>}
                      {formData.contact.email && <p><span className="font-medium">Email:</span> {formData.contact.email}</p>}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-slate-700 mb-2">Risk Assessment</h5>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Risk Level:</span> {formData.riskLevel}</p>
                      <p><span className="font-medium">Status:</span> {formData.status}</p>
                    </div>
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
              
              {currentStep < 4 ? (
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
                  <span>Create Record</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecordModal;