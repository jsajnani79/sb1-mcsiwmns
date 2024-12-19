// Gender
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

// Education
export enum Education {
  LESS_THAN_HIGH_SCHOOL = 'Less than high school',
  HIGH_SCHOOL = 'High school or equivalent',
  SOME_COLLEGE = 'Some college',
  ASSOCIATES = 'Associate degree',
  BACHELORS = 'Bachelor\'s degree',
  MASTERS = 'Master\'s degree',
  DOCTORATE = 'Doctorate or higher',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

// Employment
export enum EmploymentStatus {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  SELF_EMPLOYED = 'Self-employed',
  UNEMPLOYED = 'Unemployed',
  STUDENT = 'Student',
  RETIRED = 'Retired',
  UNABLE_TO_WORK = 'Unable to work'
}

// Income
export enum IncomeRange {
  LESS_THAN_25K = 'Less than $25,000',
  FROM_25K_TO_50K = '$25,000 - $49,999',
  FROM_50K_TO_75K = '$50,000 - $74,999',
  FROM_75K_TO_100K = '$75,000 - $99,999',
  FROM_100K_TO_150K = '$100,000 - $149,999',
  MORE_THAN_150K = '$150,000 or more',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

// Marital Status
export enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DOMESTIC_PARTNERSHIP = 'Domestic partnership',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
  SEPARATED = 'Separated'
}

// Health and Lifestyle
export enum Handedness {
  RIGHT = 'Right-handed',
  LEFT = 'Left-handed',
  AMBIDEXTROUS = 'Ambidextrous'
}

export enum SmokingStatus {
  NEVER = 'Never smoked',
  FORMER = 'Former smoker',
  CURRENT = 'Current smoker',
  OCCASIONAL = 'Occasional smoker'
}

export enum AlcoholConsumption {
  NEVER = 'Never',
  RARELY = 'Rarely',
  OCCASIONALLY = 'Occasionally',
  REGULARLY = 'Regularly',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

export enum ExerciseFrequency {
  NEVER = 'Never',
  RARELY = 'Rarely (1-2 times/month)',
  OCCASIONALLY = 'Occasionally (1-2 times/week)',
  REGULARLY = 'Regularly (3-4 times/week)',
  VERY_ACTIVE = 'Very active (5+ times/week)'
}

// Contact and Availability
export enum ContactMethod {
  EMAIL = 'Email',
  PHONE = 'Phone',
  SMS = 'SMS'
}

export enum AvailabilityPattern {
  WEEKDAY_MORNING = 'Weekday mornings',
  WEEKDAY_AFTERNOON = 'Weekday afternoons',
  WEEKDAY_EVENING = 'Weekday evenings',
  WEEKEND_MORNING = 'Weekend mornings',
  WEEKEND_AFTERNOON = 'Weekend afternoons',
  WEEKEND_EVENING = 'Weekend evenings'
}