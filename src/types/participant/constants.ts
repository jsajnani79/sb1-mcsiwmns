// Availability options
export const AVAILABILITY_OPTIONS = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'Weekend mornings',
  'Weekend afternoons',
  'Weekend evenings'
] as const;

// Contact methods
export const CONTACT_METHODS = {
  EMAIL: 'Email',
  PHONE: 'Phone',
  SMS: 'SMS'
} as const;

// Study assignment statuses
export const ASSIGNMENT_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export type AssignmentStatus = typeof ASSIGNMENT_STATUSES[keyof typeof ASSIGNMENT_STATUSES];