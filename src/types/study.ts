export interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  capacity: number;
  location?: string;
  attendees: Participant[];
}

export interface Study {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: Date;
  timeSlots: TimeSlot[];
  defaultIncentiveType: IncentiveType;
  defaultPaymentAmount?: number;
  status: StudyStatus;
  duration?: number;
  requirements: string[];
  maxParticipants?: number;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  attended: boolean | null;
  incentiveStatus: IncentiveStatus;
  incentiveType?: IncentiveType;
  creditUnits?: number;
}

export enum IncentiveStatus {
  UNALLOCATED = 'UNALLOCATED',
  PENDING = 'PENDING',
  GRANTED = 'GRANTED',
  VOID = 'VOID'
}

export enum IncentiveType {
  COURSE_CREDIT = 'COURSE_CREDIT',
  PAYMENT = 'PAYMENT',
  OTHER = 'OTHER'
}

export enum StudyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface ScheduleConfig {
  dates: string[];
  timeRanges: TimeRange[];
  slotDuration: number;
  capacityPerSlot: number;
  defaultLocation: string;
}