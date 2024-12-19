import React from 'react';
import { AdminEventList } from '../events/AdminEventList';
import { useEventStore } from '../../../store/eventStore';

export function EventsTab() {
  const { events, updateEvent, deleteEvent } = useEventStore();

  return (
    <div className="space-y-6">
      <AdminEventList
        events={events}
        onEdit={updateEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
}