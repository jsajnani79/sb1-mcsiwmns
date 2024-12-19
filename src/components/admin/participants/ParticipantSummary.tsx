import React from 'react';
import { ChevronRight, Mail, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ParticipantSummaryProps {
  participant: {
    name: string;
    email: string;
    totalStudies: number;
    completedStudies: number;
    mostRecentStudy?: {
      title: string;
      date: Date;
    };
  };
  onClick: () => void;
}

export function ParticipantSummary({ participant, onClick }: ParticipantSummaryProps) {
  const completionRate = Math.round((participant.completedStudies / participant.totalStudies) * 100);

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <User size={16} />
            {participant.name}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Mail size={16} />
            {participant.email}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {participant.mostRecentStudy ? (
          <div className="flex flex-col">
            <div className="text-sm font-medium text-gray-900">
              {participant.mostRecentStudy.title}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Calendar size={14} />
              {format(participant.mostRecentStudy.date, 'MMM d, yyyy')}
            </div>
          </div>
        ) : (
          <span className="text-sm text-gray-500">No studies</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {participant.completedStudies} / {participant.totalStudies} studies
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{completionRate}%</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </td>
    </tr>
  );
}