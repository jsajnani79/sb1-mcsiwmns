import React from 'react';
import { Edit2, Trash2, Users } from 'lucide-react';
import { Study } from '../../../types/study';
import { format } from 'date-fns';

interface StudyCardProps {
  study: Study;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function StudyCard({ study, onView, onEdit, onDelete }: StudyCardProps) {
  const totalCapacity = study.timeSlots.reduce((sum, slot) => sum + slot.capacity, 0);
  const totalBooked = study.timeSlots.reduce((sum, slot) => sum + slot.attendees.length, 0);
  const openSpots = totalCapacity - totalBooked;

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
      data-study-id={study.id}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{study.title}</h3>
          <div className="mt-1 text-sm text-gray-500">
            <p>{format(study.date, 'MMMM d, yyyy')}</p>
            <p>{study.location}</p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <span>{study.timeSlots.length} time slots</span>
            <span>•</span>
            <span>
              {openSpots} open / {totalCapacity} total spots
            </span>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <button
            onClick={onView}
            className="p-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-50"
            title="View Details"
            data-action="view"
          >
            <Users size={20} />
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-50"
            title="Edit Study"
            data-action="edit"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50"
            title="Delete Study"
            data-action="delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}