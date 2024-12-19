import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentMonth, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold">Available Time Slots</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          {/* Fixed-width container for month/year text */}
          <div className="w-40 text-center">
            <span className="text-lg font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
          </div>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}