import { addMinutes, parse, isBefore } from 'date-fns';
import { ScheduleConfig, TimeSlot } from '../types/event';

export function generateTimeSlots(config: ScheduleConfig): Omit<TimeSlot, 'id'>[] {
  const slots: Omit<TimeSlot, 'id'>[] = [];

  config.dates.forEach(date => {
    config.timeRanges.forEach(range => {
      const startDateTime = parse(`${date} ${range.startTime}`, 'yyyy-MM-dd HH:mm', new Date());
      const endDateTime = parse(`${date} ${range.endTime}`, 'yyyy-MM-dd HH:mm', new Date());
      
      let currentStart = startDateTime;
      while (isBefore(currentStart, endDateTime)) {
        const slotEnd = addMinutes(currentStart, config.slotDuration);
        if (!isBefore(slotEnd, endDateTime)) break;

        slots.push({
          startTime: currentStart,
          endTime: slotEnd,
          capacity: config.capacityPerSlot,
          location: config.defaultLocation,
          attendees: []
        });

        currentStart = slotEnd;
      }
    });
  });

  return slots;
}