export enum Ethnicity {
  HISPANIC_LATINO = 'Hispanic or Latino',
  NOT_HISPANIC_LATINO = 'Not Hispanic or Latino',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

export enum Race {
  AMERICAN_INDIAN = 'American Indian or Alaska Native',
  ASIAN = 'Asian',
  BLACK = 'Black or African American',
  PACIFIC_ISLANDER = 'Native Hawaiian or Other Pacific Islander',
  WHITE = 'White',
  MULTIPLE = 'Two or more races',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

export enum LanguageProficiency {
  NATIVE = 'Native',
  FLUENT = 'Fluent',
  INTERMEDIATE = 'Intermediate',
  BASIC = 'Basic'
}

export interface Language {
  name: string;
  proficiency: LanguageProficiency;
}