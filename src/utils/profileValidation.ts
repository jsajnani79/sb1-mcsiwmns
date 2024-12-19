import { ParticipantProfile } from '../types/participant';

export function validateProfile(profile: Partial<ParticipantProfile>): boolean {
  // Only name and email are required
  return Boolean(
    profile.name?.trim() &&
    profile.email?.trim() &&
    profile.email.includes('@') // Basic email validation
  );
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