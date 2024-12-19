import { ParticipantProfile } from '../types/participant';

export function validateProfile(profile: Partial<ParticipantProfile>): boolean {
  const requiredFields: (keyof ParticipantProfile)[] = [
    'name',
    'email',
    'phone',
    'dateOfBirth',
    'gender',
    'nationality',
    'primaryLanguage',
    'education',
    'employmentStatus',
    'handedness'
  ];

  return requiredFields.every(field => !!profile[field]);
}

export function formatProfileId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}

export function getProfileCompleteness(profile: ParticipantProfile): number {
  const totalFields = Object.keys(profile).length;
  const filledFields = Object.values(profile).filter(value => 
    value !== null && 
    value !== undefined && 
    value !== '' && 
    (Array.isArray(value) ? value.length > 0 : true)
  ).length;
  
  return Math.round((filledFields / totalFields) * 100);
}