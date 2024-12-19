```typescript
import { IncentiveType } from './study';

export interface IncentiveQueue {
  participantId: string;
  participantName: string;
  participantEmail: string;
  eventId: string;
  eventTitle: string;
  slotId: string;
  incentiveType: IncentiveType;
  defaultAmount?: number;
  allocatedAmount?: number;
  creditUnits?: number;
  dateAttended: Date;
  status: 'pending' | 'allocated' | 'sent';
  grantedAt?: Date;
}

export interface IncentiveBatch {
  id: string;
  incentives: IncentiveQueue[];
  totalAmount: number;
  dateSent: Date;
  sentBy: string;
}

export interface CreditGrant {
  participantId: string;
  studyId: string;
  creditUnits: number;
  grantedAt: Date;
  grantedBy: string;
}
```