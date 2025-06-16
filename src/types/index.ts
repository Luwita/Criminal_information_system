export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  stationId?: string;
  province?: string;
  district?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
  permissions?: string[];
}

export type UserRole = 
  | 'super_admin'
  | 'provincial_admin'
  | 'district_admin'
  | 'station_commander'
  | 'detective'
  | 'police_officer'
  | 'data_entry_clerk';

export interface PoliceStation {
  id: string;
  name: string;
  code: string;
  type: StationType;
  province: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  commanderName: string;
  officerCount: number;
  isActive: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type StationType = 
  | 'headquarters'
  | 'provincial_headquarters'
  | 'district_headquarters'
  | 'police_station'
  | 'police_post'
  | 'police_unit';

export interface CriminalCase {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  crimeType: CrimeType;
  severity: CaseSeverity;
  status: CaseStatus;
  reportedDate: Date;
  incidentDate: Date;
  location: string;
  stationId: string;
  assignedOfficer?: string;
  investigatingOfficer?: string;
  suspects: Suspect[];
  victims: Victim[];
  witnesses: Witness[];
  evidence: Evidence[];
  updates: CaseUpdate[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CrimeType = 
  | 'theft'
  | 'robbery'
  | 'burglary'
  | 'assault'
  | 'murder'
  | 'fraud'
  | 'drug_related'
  | 'domestic_violence'
  | 'traffic_violation'
  | 'cybercrime'
  | 'corruption'
  | 'other';

export type CaseSeverity = 'low' | 'medium' | 'high' | 'critical';
export type CaseStatus = 'reported' | 'under_investigation' | 'solved' | 'closed' | 'cold_case';

export interface CriminalRecord {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    alias?: string[];
    dateOfBirth: Date;
    placeOfBirth: string;
    gender: 'Male' | 'Female';
    nationality: string;
    nationalId?: string;
    passportNumber?: string;
    maritalStatus: string;
    occupation?: string;
    education?: string;
  };
  physicalDescription: {
    height: string;
    weight: string;
    eyeColor: string;
    hairColor: string;
    complexion: string;
    distinguishingMarks?: string[];
    scars?: string[];
    tattoos?: string[];
  };
  addresses: Address[];
  contacts: Contact[];
  criminalHistory: CriminalHistoryEntry[];
  fingerprints?: FingerprintRecord[];
  photos: PhotoRecord[];
  dnaProfile?: DNAProfile;
  status: 'active' | 'inactive' | 'deceased' | 'deported';
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastSeenDate?: Date;
  lastSeenLocation?: string;
}

export interface Address {
  id: string;
  type: 'current' | 'previous' | 'work' | 'family';
  street: string;
  area: string;
  district: string;
  province: string;
  country: string;
  isVerified: boolean;
  dateFrom: Date;
  dateTo?: Date;
}

export interface Contact {
  id: string;
  type: 'phone' | 'email' | 'social_media';
  value: string;
  isVerified: boolean;
  isPrimary: boolean;
}

export interface CriminalHistoryEntry {
  id: string;
  caseId: string;
  caseNumber: string;
  crimeType: CrimeType;
  charges: string[];
  arrestDate: Date;
  courtDate?: Date;
  verdict?: string;
  sentence?: string;
  fineAmount?: number;
  prisonTerm?: string;
  probationPeriod?: string;
  status: 'pending' | 'convicted' | 'acquitted' | 'dismissed';
  arrestingStation: string;
  arrestingOfficer: string;
  notes?: string;
}

export interface FingerprintRecord {
  id: string;
  type: 'ten_print' | 'latent' | 'palm';
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  captureDate: Date;
  capturedBy: string;
  imageUrl: string;
  minutiae?: string;
}

export interface PhotoRecord {
  id: string;
  type: 'mugshot' | 'scene' | 'evidence' | 'surveillance';
  url: string;
  captureDate: Date;
  capturedBy: string;
  description?: string;
  location?: string;
}

export interface DNAProfile {
  id: string;
  profileType: 'STR' | 'CODIS' | 'Y_chromosome' | 'mitochondrial';
  sampleType: 'blood' | 'saliva' | 'hair' | 'tissue' | 'other';
  collectionDate: Date;
  collectedBy: string;
  labAnalysis: string;
  profileData: string;
  matchProbability?: number;
}

export interface Suspect {
  id: string;
  name: string;
  alias?: string;
  age?: number;
  gender: string;
  address?: string;
  phoneNumber?: string;
  nationalId?: string;
  description: string;
  photo?: string;
  status: 'at_large' | 'arrested' | 'detained' | 'released' | 'convicted';
  arrestDate?: Date;
  charges: string[];
}

export interface Victim {
  id: string;
  name: string;
  age?: number;
  gender: string;
  address?: string;
  phoneNumber?: string;
  nationalId?: string;
  relationship?: string;
  injuries?: string;
  medicalReport?: string;
}

export interface Witness {
  id: string;
  name: string;
  age?: number;
  gender: string;
  address?: string;
  phoneNumber?: string;
  relationship?: string;
  statement: string;
  contactedDate: Date;
  isReliable: boolean;
}

export interface Evidence {
  id: string;
  type: string;
  description: string;
  collectedDate: Date;
  collectedBy: string;
  location: string;
  chain_of_custody: ChainOfCustody[];
  status: 'collected' | 'analyzed' | 'stored' | 'destroyed';
  photos?: string[];
  documents?: string[];
}

export interface ChainOfCustody {
  id: string;
  handedOverBy: string;
  receivedBy: string;
  date: Date;
  purpose: string;
  notes?: string;
}

export interface CaseUpdate {
  id: string;
  caseId: string;
  updatedBy: string;
  updateType: 'status_change' | 'evidence_added' | 'suspect_arrested' | 'general_update';
  description: string;
  date: Date;
  attachments?: string[];
}

export interface CrimeStatistics {
  totalCases: number;
  solvedCases: number;
  pendingCases: number;
  crimesByType: Record<CrimeType, number>;
  crimesByMonth: Array<{
    month: string;
    cases: number;
    solved: number;
  }>;
  topCrimeLocations: Array<{
    location: string;
    cases: number;
  }>;
}

export interface SearchQuery {
  id: string;
  name: string;
  description: string;
  query: string;
  filters: SearchFilters;
  createdBy: string;
  createdAt: Date;
  lastUsed?: Date;
  isPublic: boolean;
}

export interface SearchFilters {
  dateRange?: {
    from: Date;
    to: Date;
  };
  crimeTypes?: CrimeType[];
  locations?: string[];
  status?: CaseStatus[];
  severity?: CaseSeverity[];
  stations?: string[];
  officers?: string[];
}

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  description: string;
  parameters: ReportParameters;
  generatedBy: string;
  generatedAt: Date;
  format: 'pdf' | 'excel' | 'csv';
  status: 'generating' | 'completed' | 'failed';
  downloadUrl?: string;
  scheduledRun?: ScheduledRun;
}

export type ReportType = 
  | 'crime_statistics'
  | 'case_summary'
  | 'officer_performance'
  | 'station_activity'
  | 'criminal_profile'
  | 'evidence_inventory'
  | 'court_calendar'
  | 'custom';

export interface ReportParameters {
  dateRange: {
    from: Date;
    to: Date;
  };
  filters: any;
  groupBy?: string[];
  sortBy?: string;
  includeCharts?: boolean;
  includeDetails?: boolean;
}

export interface ScheduledRun {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  recipients: string[];
  isActive: boolean;
}