import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { TimeSlot } from '../../types/study';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  days: Date[];
  currentMonth: Date;
  slotsByDate: Record<string, TimeSlot[]>;
  onDateClick: (dateKey: string) => void;
}

export function CalendarGrid({ days, currentMonth, slotsByDate, onDateClick }: CalendarGridProps) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {weekDays.map((day) => (
        <div
          key={day}
          className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500"
        >
          {day}
        </div>
      ))}
      {days.map((date) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const isCurrentMonth = isSameMonth(date, currentMonth);
        
        return (
          <CalendarDay
            key={dateKey}
            date={date}
            slots={slotsByDate[dateKey] || []}
            isCurrentMonth={isCurrentMonth}
            onClick={() => onDateClick(dateKey)}
          />
        );
      })}
    </div>
  );
}