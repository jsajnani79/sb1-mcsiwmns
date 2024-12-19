import React, { useState } from 'react';
import { PlusCircle, Wand2 } from 'lucide-react';
import { Event, TimeSlot } from '../../types/event';
import { format } from 'date-fns';
import { TimeSlotGenerator } from './TimeSlotGenerator';
import { TimeSlotEditor } from './TimeSlotEditor';

interface EventFormProps {
  onSubmit: (event: Event) => void;
  initialEvent?: Event;
}

export function EventForm({ onSubmit, initialEvent }: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [imageUrl, setImageUrl] = useState(initialEvent?.imageUrl || '');
  const [location, setLocation] = useState(initialEvent?.location || '');
  const [date, setDate] = useState(
    initialEvent ? format(initialEvent.date, 'yyyy-MM-dd') : ''
  );
  const [timeSlots, setTimeSlots] = useState<Omit<TimeSlot, 'id'>[]>(
    initialEvent?.timeSlots.map(({ startTime, endTime, capacity, location, attendees }) => ({
      startTime,
      endTime,
      capacity,
      location,
      attendees: []
    })) || []
  );
  const [showGenerator, setShowGenerator] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: initialEvent?.id || crypto.randomUUID(),
      title,
      description,
      imageUrl,
      location,
      date: new Date(date),
      timeSlots: timeSlots.map((slot) => ({
        ...slot,
        id: crypto.randomUUID(),
      })),
    };
    
    onSubmit(event);
  };

  const handleGeneratedSlots = (generatedSlots: Omit<TimeSlot, 'id'>[]) => {
    setTimeSlots([...timeSlots, ...generatedSlots]);
    setShowGenerator(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Time Slots</h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowGenerator(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Wand2 size={20} />
              Generate Slots
            </button>
            <button
              type="button"
              onClick={() => setTimeSlots([...timeSlots, {
                startTime: new Date(),
                endTime: new Date(),
                capacity: 1,
                location: location,
                attendees: []
              }])}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={20} />
              Add Manual Slot
            </button>
          </div>
        </div>

        {showGenerator ? (
          <TimeSlotGenerator
            defaultLocation={location}
            onGenerate={handleGeneratedSlots}
          />
        ) : (
          <TimeSlotEditor
            slots={timeSlots}
            defaultLocation={location}
            onUpdate={setTimeSlots}
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {initialEvent ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}