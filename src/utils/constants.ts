export const PROFILE_SECTIONS = {
  BASIC_INFO: 'Basic Information',
  DEMOGRAPHICS: 'Demographics',
  EDUCATION_EMPLOYMENT: 'Education & Employment',
  HEALTH_LIFESTYLE: 'Health & Lifestyle',
  RESEARCH: 'Research Participation'
} as const;

export const AVAILABILITY_OPTIONS = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'Weekend mornings',
  'Weekend afternoons',
  'Weekend evenings'
] as const;

export const CONTACT_METHODS = {
  EMAIL: 'Email',
  PHONE: 'Phone',
  SMS: 'SMS'
} as const;