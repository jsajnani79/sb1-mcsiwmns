import { LabAffiliation } from './lab';

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  title?: string;
  labAffiliations: LabAffiliation[];
  createdAt: Date;
  updatedAt: Date;
}