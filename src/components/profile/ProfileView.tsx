import React from 'react';
import { ParticipantProfile } from '../../types/participant';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { DemographicsSection } from './sections/DemographicsSection';
import { HealthSection } from './sections/HealthSection';
import { SocioeconomicSection } from './sections/SocioeconomicSection';
import { ResearchParticipationSection } from './sections/ResearchParticipationSection';
import { BookedStudiesSection } from './sections/BookedStudiesSection';

interface ProfileViewProps {
  profile: ParticipantProfile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      <BookedStudiesSection participantEmail={profile.email} />
      <BasicInfoSection profile={profile} />
      <DemographicsSection profile={profile} />
      <SocioeconomicSection profile={profile} />
      <HealthSection profile={profile} />
      <ResearchParticipationSection profile={profile} />
    </div>
  );
}