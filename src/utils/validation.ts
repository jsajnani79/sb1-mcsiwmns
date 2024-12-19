import { TeamMember } from '../types/team';

export function validateEmail(email: string): boolean {
  // Email regex that requires a TLD (top-level domain)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validateTeamMember(data: Partial<TeamMember>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (data.email?.trim()) {
    if (!validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address with a domain (e.g., @example.com)';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}