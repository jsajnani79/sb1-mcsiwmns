import { IncentiveType, IncentiveStatus } from '../study';
import {
  Gender, Education, EmploymentStatus, IncomeRange, MaritalStatus,
  Handedness, SmokingStatus, AlcoholConsumption, ExerciseFrequency,
  ContactMethod, AvailabilityPattern
} from './enums';

export interface ParticipantProfile {
  id: string;
  // Required fields
  name: string;
  email: string;
  
  // Optional fields
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  pronouns?: string;
  ethnicity?: string[];
  race?: string[];
  nationality?: string;
  primaryLanguage?: string;
  otherLanguages?: string[];
  education?: Education;
  employmentStatus?: EmploymentStatus;
  occupation?: string;
  householdIncome?: IncomeRange;
  maritalStatus?: MaritalStatus;
  handedness?: Handedness;
  smokingStatus?: SmokingStatus;
  alcoholConsumption?: AlcoholConsumption;
  exerciseFrequency?: ExerciseFrequency;
  chronicConditions?: string[];
  medications?: string[];
  previousResearchParticipation?: boolean;
  willingToBeContacted?: boolean;
  preferredContactMethod?: ContactMethod;
  availabilityPattern?: AvailabilityPattern[];
  mobilityIssues?: boolean;
  visualImpairment?: boolean;
  hearingImpairment?: boolean;
}

export interface AdminParticipant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParticipantStudyAssignment {
  participantId: string;
  studyId: string;
  slotId: string;
  incentiveType: IncentiveType;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  assignedAt: Date;
}