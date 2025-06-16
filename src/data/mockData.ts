import { PoliceStation, CriminalCase, User, CrimeStatistics, CriminalRecord, SearchQuery, Report } from '../types';

export const zambianProvinces = [
  'Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka', 
  'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'
];

export const policeStations: PoliceStation[] = [
  // Headquarters
  {
    id: 'hq-001',
    name: 'Zambia Police Service Headquarters',
    code: 'ZPS-HQ',
    type: 'headquarters',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Zambia Police Service Headquarters, Lusaka',
    phone: '+260-211-222-333',
    email: 'headquarters@zambiapolice.gov.zm',
    commanderName: 'Inspector General Moses Sakala',
    officerCount: 250,
    isActive: true,
    coordinates: { lat: -15.4067, lng: 28.2833 }
  },
  
  // Provincial Headquarters
  {
    id: 'prov-lsk-001',
    name: 'Lusaka Provincial Police Headquarters',
    code: 'LSK-PHQ',
    type: 'provincial_headquarters',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Lusaka Provincial Police Headquarters, Lusaka',
    phone: '+260-211-234-567',
    email: 'lusaka.province@zambiapolice.gov.zm',
    commanderName: 'Assistant Commissioner John Mwale',
    officerCount: 180,
    isActive: true,
    coordinates: { lat: -15.4167, lng: 28.2833 }
  },
  
  {
    id: 'prov-cb-001',
    name: 'Copperbelt Provincial Police Headquarters',
    code: 'CB-PHQ',
    type: 'provincial_headquarters',
    province: 'Copperbelt',
    district: 'Ndola',
    address: 'Copperbelt Provincial Police Headquarters, Ndola',
    phone: '+260-212-345-678',
    email: 'copperbelt.province@zambiapolice.gov.zm',
    commanderName: 'Assistant Commissioner Mary Banda',
    officerCount: 165,
    isActive: true,
    coordinates: { lat: -12.9687, lng: 28.6369 }
  },

  // District Headquarters
  {
    id: 'dist-lsk-001',
    name: 'Lusaka District Police Headquarters',
    code: 'LSK-DHQ',
    type: 'district_headquarters',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Lusaka District Police Headquarters, Lusaka',
    phone: '+260-211-345-678',
    email: 'lusaka.district@zambiapolice.gov.zm',
    commanderName: 'Chief Inspector Peter Phiri',
    officerCount: 120,
    isActive: true,
    coordinates: { lat: -15.4267, lng: 28.2933 }
  },

  // Police Stations
  {
    id: 'stn-lsk-001',
    name: 'Central Police Station',
    code: 'LSK-CEN',
    type: 'police_station',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Cairo Road, Lusaka',
    phone: '+260-211-456-789',
    email: 'central.station@zambiapolice.gov.zm',
    commanderName: 'Inspector James Mwanza',
    officerCount: 45,
    isActive: true,
    coordinates: { lat: -15.4134, lng: 28.2871 }
  },

  {
    id: 'stn-lsk-002',
    name: 'Kamwala Police Station',
    code: 'LSK-KAM',
    type: 'police_station',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Kamwala, Lusaka',
    phone: '+260-211-567-890',
    email: 'kamwala.station@zambiapolice.gov.zm',
    commanderName: 'Inspector Grace Mulenga',
    officerCount: 38,
    isActive: true,
    coordinates: { lat: -15.4234, lng: 28.2971 }
  },

  {
    id: 'stn-lsk-003',
    name: 'Chilenje Police Station',
    code: 'LSK-CHI',
    type: 'police_station',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Chilenje, Lusaka',
    phone: '+260-211-678-901',
    email: 'chilenje.station@zambiapolice.gov.zm',
    commanderName: 'Inspector Michael Tembo',
    officerCount: 42,
    isActive: true,
    coordinates: { lat: -15.3934, lng: 28.3071 }
  },

  {
    id: 'stn-cb-001',
    name: 'Ndola Central Police Station',
    code: 'CB-NDL',
    type: 'police_station',
    province: 'Copperbelt',
    district: 'Ndola',
    address: 'Broadway, Ndola',
    phone: '+260-212-456-789',
    email: 'ndola.central@zambiapolice.gov.zm',
    commanderName: 'Inspector Robert Chanda',
    officerCount: 55,
    isActive: true,
    coordinates: { lat: -12.9687, lng: 28.6369 }
  },

  // Police Posts
  {
    id: 'post-lsk-001',
    name: 'Kabulonga Police Post',
    code: 'LSK-KAB',
    type: 'police_post',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Kabulonga, Lusaka',
    phone: '+260-211-789-012',
    email: 'kabulonga.post@zambiapolice.gov.zm',
    commanderName: 'Sergeant Daniel Mwale',
    officerCount: 12,
    isActive: true,
    coordinates: { lat: -15.3834, lng: 28.3171 }
  },

  {
    id: 'post-lsk-002',
    name: 'Woodlands Police Post',
    code: 'LSK-WOO',
    type: 'police_post',
    province: 'Lusaka',
    district: 'Lusaka',
    address: 'Woodlands, Lusaka',
    phone: '+260-211-890-123',
    email: 'woodlands.post@zambiapolice.gov.zm',
    commanderName: 'Sergeant Alice Banda',
    officerCount: 8,
    isActive: true,
    coordinates: { lat: -15.3734, lng: 28.3271 }
  }
];

export const users: User[] = [
  {
    id: 'user-001',
    name: 'Moses Sakala',
    email: 'moses.sakala@zambiapolice.gov.zm',
    role: 'super_admin',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date('2024-01-15')
  },
  {
    id: 'user-002',
    name: 'John Mwale',
    email: 'john.mwale@zambiapolice.gov.zm',
    role: 'provincial_admin',
    province: 'Lusaka',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2024-01-14')
  },
  {
    id: 'user-003',
    name: 'James Mwanza',
    email: 'james.mwanza@zambiapolice.gov.zm',
    role: 'station_commander',
    stationId: 'stn-lsk-001',
    province: 'Lusaka',
    district: 'Lusaka',
    isActive: true,
    createdAt: new Date('2023-02-01'),
    lastLogin: new Date('2024-01-15')
  },
  {
    id: 'user-004',
    name: 'Grace Mulenga',
    email: 'grace.mulenga@zambiapolice.gov.zm',
    role: 'detective',
    stationId: 'stn-lsk-002',
    province: 'Lusaka',
    district: 'Lusaka',
    isActive: true,
    createdAt: new Date('2023-02-15'),
    lastLogin: new Date('2024-01-15')
  },
  {
    id: 'user-005',
    name: 'Peter Banda',
    email: 'peter.banda@zambiapolice.gov.zm',
    role: 'police_officer',
    stationId: 'stn-lsk-001',
    province: 'Lusaka',
    district: 'Lusaka',
    isActive: true,
    createdAt: new Date('2023-03-01'),
    lastLogin: new Date('2024-01-14')
  },
  {
    id: 'user-006',
    name: 'Sarah Phiri',
    email: 'sarah.phiri@zambiapolice.gov.zm',
    role: 'data_entry_clerk',
    stationId: 'stn-lsk-002',
    province: 'Lusaka',
    district: 'Lusaka',
    isActive: true,
    createdAt: new Date('2023-03-15'),
    lastLogin: new Date('2024-01-13')
  },
  {
    id: 'user-007',
    name: 'Michael Zulu',
    email: 'michael.zulu@zambiapolice.gov.zm',
    role: 'detective',
    stationId: 'stn-cb-001',
    province: 'Copperbelt',
    district: 'Ndola',
    isActive: false,
    createdAt: new Date('2023-04-01'),
    lastLogin: new Date('2024-01-10')
  }
];

export const criminalRecords: CriminalRecord[] = [
  {
    id: 'cr-001',
    personalInfo: {
      firstName: 'Patrick',
      lastName: 'Mwila',
      dateOfBirth: new Date('1995-03-15'),
      placeOfBirth: 'Lusaka, Zambia',
      gender: 'Male',
      nationality: 'Zambian',
      nationalId: '123456/78/9',
      maritalStatus: 'Single',
      occupation: 'Unemployed',
      education: 'Grade 12'
    },
    physicalDescription: {
      height: '175cm',
      weight: '70kg',
      eyeColor: 'Brown',
      hairColor: 'Black',
      complexion: 'Dark',
      distinguishingMarks: ['Scar on left cheek'],
      tattoos: ['Dragon tattoo on right arm']
    },
    addresses: [
      {
        id: 'addr-001',
        type: 'current',
        street: 'Plot 123, Compound Area',
        area: 'Kalingalinga',
        district: 'Lusaka',
        province: 'Lusaka',
        country: 'Zambia',
        isVerified: true,
        dateFrom: new Date('2023-01-01')
      }
    ],
    contacts: [
      {
        id: 'cont-001',
        type: 'phone',
        value: '+260-977-123-456',
        isVerified: true,
        isPrimary: true
      }
    ],
    criminalHistory: [
      {
        id: 'ch-001',
        caseId: 'case-002',
        caseNumber: 'LSK/2024/002',
        crimeType: 'theft',
        charges: ['Motor Vehicle Theft', 'Receiving Stolen Property'],
        arrestDate: new Date('2024-01-12'),
        courtDate: new Date('2024-02-15'),
        verdict: 'Guilty',
        sentence: '2 years imprisonment',
        status: 'convicted',
        arrestingStation: 'stn-lsk-001',
        arrestingOfficer: 'user-003'
      }
    ],
    photos: [
      {
        id: 'photo-001',
        type: 'mugshot',
        url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        captureDate: new Date('2024-01-12'),
        capturedBy: 'user-003',
        description: 'Arrest photo'
      }
    ],
    status: 'active',
    riskLevel: 'medium',
    createdBy: 'user-003',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    lastSeenDate: new Date('2024-01-12'),
    lastSeenLocation: 'Central Police Station, Lusaka'
  },
  {
    id: 'cr-002',
    personalInfo: {
      firstName: 'Mary',
      lastName: 'Tembo',
      alias: ['Queen Mary'],
      dateOfBirth: new Date('1988-07-22'),
      placeOfBirth: 'Ndola, Zambia',
      gender: 'Female',
      nationality: 'Zambian',
      nationalId: '987654/32/1',
      maritalStatus: 'Divorced',
      occupation: 'Trader',
      education: 'Diploma'
    },
    physicalDescription: {
      height: '165cm',
      weight: '65kg',
      eyeColor: 'Brown',
      hairColor: 'Black',
      complexion: 'Medium',
      distinguishingMarks: ['Birthmark on neck']
    },
    addresses: [
      {
        id: 'addr-002',
        type: 'current',
        street: 'House 45, Masala',
        area: 'Masala',
        district: 'Ndola',
        province: 'Copperbelt',
        country: 'Zambia',
        isVerified: true,
        dateFrom: new Date('2022-06-01')
      }
    ],
    contacts: [
      {
        id: 'cont-002',
        type: 'phone',
        value: '+260-966-789-012',
        isVerified: true,
        isPrimary: true
      }
    ],
    criminalHistory: [
      {
        id: 'ch-002',
        caseId: 'case-003',
        caseNumber: 'CB/2023/045',
        crimeType: 'fraud',
        charges: ['Obtaining Money by False Pretenses'],
        arrestDate: new Date('2023-11-20'),
        status: 'pending',
        arrestingStation: 'stn-cb-001',
        arrestingOfficer: 'user-007'
      }
    ],
    photos: [
      {
        id: 'photo-002',
        type: 'mugshot',
        url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        captureDate: new Date('2023-11-20'),
        capturedBy: 'user-007',
        description: 'Arrest photo'
      }
    ],
    status: 'active',
    riskLevel: 'low',
    createdBy: 'user-007',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20'),
    lastSeenDate: new Date('2023-11-20'),
    lastSeenLocation: 'Ndola Central Police Station'
  }
];

export const savedSearches: SearchQuery[] = [
  {
    id: 'search-001',
    name: 'High Priority Cases - Last 30 Days',
    description: 'All high and critical severity cases from the last 30 days',
    query: 'severity:(high OR critical) AND reportedDate:[now-30d TO now]',
    filters: {
      dateRange: {
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date()
      },
      severity: ['high', 'critical']
    },
    createdBy: 'user-001',
    createdAt: new Date('2024-01-01'),
    lastUsed: new Date('2024-01-15'),
    isPublic: true
  },
  {
    id: 'search-002',
    name: 'Unsolved Theft Cases - Lusaka',
    description: 'All unsolved theft cases in Lusaka province',
    query: 'crimeType:theft AND status:(reported OR under_investigation) AND province:Lusaka',
    filters: {
      crimeTypes: ['theft'],
      status: ['reported', 'under_investigation'],
      locations: ['Lusaka']
    },
    createdBy: 'user-002',
    createdAt: new Date('2024-01-05'),
    lastUsed: new Date('2024-01-14'),
    isPublic: false
  }
];

export const reports: Report[] = [
  {
    id: 'report-001',
    title: 'Monthly Crime Statistics - January 2024',
    type: 'crime_statistics',
    description: 'Comprehensive crime statistics report for January 2024',
    parameters: {
      dateRange: {
        from: new Date('2024-01-01'),
        to: new Date('2024-01-31')
      },
      filters: {},
      groupBy: ['crimeType', 'location'],
      includeCharts: true,
      includeDetails: true
    },
    generatedBy: 'user-001',
    generatedAt: new Date('2024-02-01'),
    format: 'pdf',
    status: 'completed',
    downloadUrl: '/reports/monthly-crime-stats-jan-2024.pdf'
  },
  {
    id: 'report-002',
    title: 'Station Performance Report - Q4 2023',
    type: 'station_activity',
    description: 'Performance analysis of all police stations for Q4 2023',
    parameters: {
      dateRange: {
        from: new Date('2023-10-01'),
        to: new Date('2023-12-31')
      },
      filters: {},
      groupBy: ['station', 'month'],
      includeCharts: true,
      includeDetails: false
    },
    generatedBy: 'user-001',
    generatedAt: new Date('2024-01-05'),
    format: 'excel',
    status: 'completed',
    downloadUrl: '/reports/station-performance-q4-2023.xlsx'
  }
];

export const criminalCases: CriminalCase[] = [
  {
    id: 'case-001',
    caseNumber: 'LSK/2024/001',
    title: 'Residential Burglary - Kabulonga',
    description: 'Break-in at residential property in Kabulonga area. Multiple items stolen including electronics and jewelry.',
    crimeType: 'burglary',
    severity: 'medium',
    status: 'under_investigation',
    reportedDate: new Date('2024-01-10'),
    incidentDate: new Date('2024-01-09'),
    location: 'Kabulonga, Lusaka',
    stationId: 'stn-lsk-001',
    assignedOfficer: 'user-003',
    investigatingOfficer: 'user-004',
    suspects: [
      {
        id: 'sus-001',
        name: 'Unknown Male',
        gender: 'Male',
        description: 'Approximately 25-30 years old, medium build, dark complexion',
        status: 'at_large',
        charges: ['Breaking and Entering', 'Theft']
      }
    ],
    victims: [
      {
        id: 'vic-001',
        name: 'Sarah Mwamba',
        age: 35,
        gender: 'Female',
        address: 'Plot 123, Kabulonga',
        phoneNumber: '+260-977-123-456',
        relationship: 'Homeowner'
      }
    ],
    witnesses: [],
    evidence: [
      {
        id: 'ev-001',
        type: 'Fingerprints',
        description: 'Fingerprints found on window frame',
        collectedDate: new Date('2024-01-10'),
        collectedBy: 'Forensics Team A',
        location: 'Victim\'s residence',
        chain_of_custody: [],
        status: 'analyzed'
      }
    ],
    updates: [
      {
        id: 'upd-001',
        caseId: 'case-001',
        updatedBy: 'user-004',
        updateType: 'evidence_added',
        description: 'Fingerprint evidence collected and sent for analysis',
        date: new Date('2024-01-10')
      }
    ],
    createdBy: 'user-003',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'case-002',
    caseNumber: 'LSK/2024/002',
    title: 'Vehicle Theft - CBD',
    description: 'Motor vehicle stolen from parking area in Central Business District',
    crimeType: 'theft',
    severity: 'high',
    status: 'solved',
    reportedDate: new Date('2024-01-08'),
    incidentDate: new Date('2024-01-08'),
    location: 'Cairo Road, Lusaka',
    stationId: 'stn-lsk-001',
    assignedOfficer: 'user-003',
    investigatingOfficer: 'user-004',
    suspects: [
      {
        id: 'sus-002',
        name: 'Patrick Mwila',
        age: 28,
        gender: 'Male',
        address: 'Compound Area, Lusaka',
        nationalId: 'NRC123456789',
        description: 'Known vehicle thief with previous convictions',
        status: 'arrested',
        arrestDate: new Date('2024-01-12'),
        charges: ['Motor Vehicle Theft', 'Receiving Stolen Property']
      }
    ],
    victims: [
      {
        id: 'vic-002',
        name: 'David Phiri',
        age: 42,
        gender: 'Male',
        address: 'Woodlands, Lusaka',
        phoneNumber: '+260-966-789-012',
        relationship: 'Vehicle Owner'
      }
    ],
    witnesses: [
      {
        id: 'wit-001',
        name: 'Mary Banda',
        age: 45,
        gender: 'Female',
        address: 'Kamwala, Lusaka',
        phoneNumber: '+260-955-456-789',
        relationship: 'Witness',
        statement: 'Saw the suspect breaking into the vehicle and driving away',
        contactedDate: new Date('2024-01-09'),
        isReliable: true
      }
    ],
    evidence: [
      {
        id: 'ev-002',
        type: 'CCTV Footage',
        description: 'Security camera footage showing the theft',
        collectedDate: new Date('2024-01-09'),
        collectedBy: 'Detective Grace Mulenga',
        location: 'Cairo Road CCTV System',
        chain_of_custody: [],
        status: 'analyzed'
      }
    ],
    updates: [
      {
        id: 'upd-002',
        caseId: 'case-002',
        updatedBy: 'user-004',
        updateType: 'suspect_arrested',
        description: 'Suspect arrested and vehicle recovered',
        date: new Date('2024-01-12')
      }
    ],
    createdBy: 'user-003',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12')
  }
];

export const crimeStatistics: CrimeStatistics = {
  totalCases: 156,
  solvedCases: 89,
  pendingCases: 67,
  crimesByType: {
    theft: 45,
    burglary: 32,
    robbery: 18,
    assault: 23,
    fraud: 15,
    drug_related: 12,
    domestic_violence: 8,
    murder: 3,
    traffic_violation: 0,
    cybercrime: 0,
    corruption: 0,
    other: 0
  },
  crimesByMonth: [
    { month: 'Jan', cases: 23, solved: 15 },
    { month: 'Feb', cases: 18, solved: 12 },
    { month: 'Mar', cases: 25, solved: 16 },
    { month: 'Apr', cases: 21, solved: 13 },
    { month: 'May', cases: 19, solved: 11 },
    { month: 'Jun', cases: 22, solved: 14 },
    { month: 'Jul', cases: 28, solved: 8 }
  ],
  topCrimeLocations: [
    { location: 'Central Business District', cases: 34 },
    { location: 'Kamwala', cases: 28 },
    { location: 'Chilenje', cases: 23 },
    { location: 'Kabulonga', cases: 19 },
    { location: 'Woodlands', cases: 15 }
  ]
};