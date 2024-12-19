import React from 'react';
import { Search, Plus } from 'lucide-react';

interface ParticipantFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: 'all' | 'upcoming' | 'past';
  onFilterChange: (filter: 'all' | 'upcoming' | 'past') => void;
  onAddClick: () => void;
}

export function ParticipantFilters({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  onAddClick,
}: ParticipantFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search participants..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Participant
        </button>
        {['all', 'upcoming', 'past'].map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(option as 'all' | 'upcoming' | 'past')}
            className={`px-4 py-2 rounded-md ${
              filter === option
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}