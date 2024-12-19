import React, { useMemo } from 'react';
import { Search, Check } from 'lucide-react';
import { Study } from '../../../../types/study';
import { format } from 'date-fns';
import { parseDateString, isSameDate } from '../../../../utils/dateUtils';

interface StudySearchProps {
  studies: Study[];
  onStudySelect: (studyId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStudyId?: string;
}

export function StudySearch({ 
  studies, 
  onStudySelect, 
  searchQuery, 
  onSearchChange,
  selectedStudyId 
}: StudySearchProps) {
  const filteredStudies = useMemo(() => {
    // If a study is selected, only show that study
    if (selectedStudyId) {
      return studies.filter(study => study.id === selectedStudyId);
    }

    if (!searchQuery.trim()) return studies;

    const searchLower = searchQuery.toLowerCase();
    const searchDate = parseDateString(searchQuery);

    return studies.filter(study => {
      // Match by title
      if (study.title.toLowerCase().includes(searchLower)) return true;

      // Match by date if we parsed a valid date
      if (searchDate && isSameDate(study.date, searchDate)) return true;

      // Match by formatted date string
      const dateStr = format(study.date, 'MMMM d, yyyy').toLowerCase();
      if (dateStr.includes(searchLower)) return true;

      return false;
    });
  }, [studies, searchQuery, selectedStudyId]);

  return (
    <div className="space-y-4">
      {!selectedStudyId && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title or date (e.g., MM/DD/YY)"
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="max-h-60 overflow-y-auto border rounded-md divide-y">
        {filteredStudies.length > 0 ? (
          filteredStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => onStudySelect(study.id === selectedStudyId ? '' : study.id)}
              className={`w-full px-4 py-3 text-left hover:bg-blue-50 flex justify-between items-center ${
                selectedStudyId === study.id 
                  ? 'bg-blue-50 border-2 border-blue-500' 
                  : 'border border-transparent'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">{study.title}</div>
                <div className="text-sm text-gray-500">{format(study.date, 'MMMM d, yyyy')}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  {study.timeSlots.filter(slot => 
                    slot.attendees.length < slot.capacity
                  ).length} available slots
                </div>
                {selectedStudyId === study.id && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            No studies found matching your search
          </div>
        )}
      </div>

      {selectedStudyId && (
        <button
          onClick={() => {
            onStudySelect('');
            onSearchChange('');
          }}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear selection
        </button>
      )}
    </div>
  );
}