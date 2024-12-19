import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Study, TimeSlot } from '../../types/study';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { DaySlotModal } from './DaySlotModal';
import { getCalendarDays, groupSlotsByDate } from '../../utils/calendarUtils';

interface CalendarViewProps {
  study: Study;
  onSelectSlot: (slot: TimeSlot) => void;
}

export function CalendarView({ study, onSelectSlot }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const days = getCalendarDays(currentMonth);
  const slotsByDate = groupSlotsByDate(study.timeSlots);

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (dateKey: string) => {
    if (slotsByDate[dateKey]?.length > 0) {
      setSelectedDate(dateKey);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <CalendarHeader
          currentMonth={currentMonth}
          onPreviousMonth={previousMonth}
          onNextMonth={nextMonth}
        />
        <CalendarGrid
          days={days}
          currentMonth={currentMonth}
          slotsByDate={slotsByDate}
          onDateClick={handleDateClick}
        />
      </div>

      {selectedDate && (
        <DaySlotModal
          date={new Date(selectedDate)}
          slots={slotsByDate[selectedDate] || []}
          onSelect={onSelectSlot}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </>
  );
}