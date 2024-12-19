import React from 'react';
import { format } from 'date-fns';
import { TimeSlot } from '../../types/study';
import { getAvailableSlots } from '../../utils/calendarUtils';

interface CalendarDayProps {
  date: Date;
  slots: TimeSlot[];
  isCurrentMonth: boolean;
  onClick: () => void;
}

export function CalendarDay({ date, slots, isCurrentMonth, onClick }: CalendarDayProps) {
  const hasSlots = slots.length > 0;
  const availableSlots = getAvailableSlots(slots);
  const hasAvailableSlots = availableSlots.length > 0;

  return (
    <div
      onClick={() => hasAvailableSlots && onClick()}
      className={`
        bg-white p-4 min-h-[100px] flex flex-col items-center justify-center
        ${hasAvailableSlots ? 'cursor-pointer hover:bg-gray-50' : ''}
        ${!isCurrentMonth ? 'bg-gray-50' : ''}
      `}
    >
      <span className={`text-sm ${
        !isCurrentMonth ? 'text-gray-400' :
        hasSlots ? 'font-medium' : 'text-gray-500'
      }`}>
        {format(date, 'd')}
      </span>
      {hasAvailableSlots && isCurrentMonth && (
        <span className="mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {availableSlots.length} slot{availableSlots.length !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}