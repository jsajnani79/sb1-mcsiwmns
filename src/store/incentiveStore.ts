```typescript
import { create } from 'zustand';
import { IncentiveQueue, IncentiveBatch } from '../types/incentive';
import { IncentiveType } from '../types/study';

interface IncentiveState {
  queue: IncentiveQueue[];
  batches: IncentiveBatch[];
}

interface IncentiveActions {
  addToQueue: (incentive: IncentiveQueue) => void;
  removeFromQueue: (participantId: string, eventId: string) => void;
  updateAllocation: (participantId: string, eventId: string, amount: number) => void;
  sendBatch: (adminName: string) => void;
  getBatchHistory: (type: IncentiveType) => IncentiveBatch[];
}

export const useIncentiveStore = create<IncentiveState & IncentiveActions>((set, get) => ({
  queue: [],
  batches: [],

  addToQueue: (incentive) => {
    set((state) => ({
      queue: [...state.queue, incentive]
    }));
  },

  removeFromQueue: (participantId, eventId) => {
    set((state) => ({
      queue: state.queue.filter(item => 
        !(item.participantId === participantId && item.eventId === eventId)
      )
    }));
  },

  updateAllocation: (participantId, eventId, amount) => {
    set((state) => ({
      queue: state.queue.map(item => 
        item.participantId === participantId && item.eventId === eventId
          ? { ...item, allocatedAmount: amount }
          : item
      )
    }));
  },

  sendBatch: (adminName) => {
    const state = get();
    
    const newBatch: IncentiveBatch = {
      id: crypto.randomUUID(),
      incentives: state.queue.map(item => ({ 
        ...item, 
        status: 'sent',
        grantedAt: new Date()
      })),
      totalAmount: state.queue.reduce((sum, item) => 
        sum + (item.incentiveType === IncentiveType.PAYMENT ? (item.allocatedAmount || 0) : 0), 
      0),
      dateSent: new Date(),
      sentBy: adminName
    };

    set((state) => ({
      queue: [],
      batches: [...state.batches, newBatch]
    }));
  },

  getBatchHistory: (type) => {
    const state = get();
    return state.batches.filter(batch => 
      batch.incentives.some(incentive => incentive.incentiveType === type)
    );
  }
}));
```