import React from 'react';
import { ParticipantProfile } from '../../types/participant';
import { Activity, Calendar, ClipboardList, Users } from 'lucide-react';

interface ProfileMetricsProps {
  profile: ParticipantProfile;
}

export function ProfileMetrics({ profile }: ProfileMetricsProps) {
  const metrics = [
    {
      icon: Calendar,
      label: 'Availability Slots',
      value: profile.availabilityPattern.length,
    },
    {
      icon: Activity,
      label: 'Exercise Frequency',
      value: profile.exerciseFrequency,
    },
    {
      icon: ClipboardList,
      label: 'Research Status',
      value: profile.previousResearchParticipation ? 'Experienced' : 'New',
    },
    {
      icon: Users,
      label: 'Contact Preference',
      value: profile.preferredContactMethod,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
        >
          <div className="flex-shrink-0">
            <metric.icon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{metric.label}</p>
            <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}