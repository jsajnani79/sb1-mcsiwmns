import { Study } from '../types/study';

export function filterStudiesByDate(studies: Study[], filter: 'all' | 'upcoming' | 'past'): Study[] {
  const now = new Date();
  return studies.filter(study => {
    switch (filter) {
      case 'upcoming':
        return study.date >= now;
      case 'past':
        return study.date < now;
      default:
        return true;
    }
  });
}

export function filterParticipantsBySearchTerm(participants: any[], searchTerm: string) {
  const searchLower = searchTerm.toLowerCase();
  return participants.filter(participant =>
    participant.name.toLowerCase().includes(searchLower) ||
    participant.email.toLowerCase().includes(searchLower) ||
    participant.studyTitle.toLowerCase().includes(searchLower)
  );
}