export interface Lab {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LabInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  description?: string;
  googleMapsUrl?: string;
  hours?: string[];
  socialLinks?: Array<{
    platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
    url: string;
  }>;
  privacyPolicyUrl?: string;
  termsUrl?: string;
}

export enum LabRole {
  PRINCIPAL_INVESTIGATOR = 'Principal Investigator',
  RESEARCHER = 'Researcher',
  RESEARCH_ASSISTANT = 'Research Assistant',
  LAB_MANAGER = 'Lab Manager',
  ADMIN = 'Administrator'
}

export interface LabAffiliation {
  labId: string;
  role: LabRole;
}