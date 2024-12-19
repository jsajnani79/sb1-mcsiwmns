export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  UNKNOWN = 'Unknown'
}

export enum VisionCorrection {
  NONE = 'None',
  GLASSES = 'Glasses',
  CONTACTS = 'Contact Lenses',
  LASIK = 'LASIK Surgery',
  OTHER = 'Other'
}

export enum HearingAid {
  NONE = 'None',
  HEARING_AID = 'Hearing Aid',
  COCHLEAR_IMPLANT = 'Cochlear Implant',
  OTHER = 'Other'
}

export interface HealthCondition {
  name: string;
  diagnosisYear?: number;
  controlled: boolean;
  medications?: string[];
}