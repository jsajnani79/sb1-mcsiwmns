```typescript
import React from 'react';
import { X, DollarSign, GraduationCap } from 'lucide-react';
import { IncentiveType } from '../../../../../types/study';

interface IncentiveHistoryHeaderProps {
  type: IncentiveType;
  onClose: () => void;
}

export function IncentiveHistoryHeader({ type, onClose }: IncentiveHistoryHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        {type === IncentiveType.PAYMENT ? (
          <DollarSign className="w-6 h-6 text-green-600" />
        ) : (
          <GraduationCap className="w-6 h-6 text-blue-600" />
        )}
        <h3 className="text-lg font-semibold">
          {type === IncentiveType.PAYMENT ? 'Payment History' : 'Course Credit History'}
        </h3>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600"
      >
        <X size={20} />
      </button>
    </div>
  );
}
```