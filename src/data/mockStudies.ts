import { Study, IncentiveType, StudyStatus } from '../types/study';
import { addHours, setHours, setMinutes, startOfToday } from 'date-fns';

const today = startOfToday();

export const mockStudies: Study[] = [
  {
    id: '1',
    title: 'Cognitive Processing Research',
    description: 'A study investigating cognitive processing patterns in problem-solving tasks.',
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
    location: 'Cognitive Research Lab - Room 101',
    date: today,
    defaultIncentiveType: IncentiveType.COURSE_CREDIT,
    status: StudyStatus.ACTIVE,
    duration: 120,
    requirements: [
      'Must be 18 years or older',
      'No history of neurological conditions',
      'Normal or corrected-to-normal vision'
    ],
    maxParticipants: 40,
    timeSlots: [
      {
        id: '1-1',
        startTime: setHours(setMinutes(today, 0), 9),
        endTime: setHours(setMinutes(today, 0), 11),
        capacity: 20,
        attendees: []
      },
      {
        id: '1-2',
        startTime: setHours(setMinutes(today, 0), 13),
        endTime: setHours(setMinutes(today, 0), 15),
        capacity: 20,
        attendees: []
      }
    ]
  },
  {
    id: '2',
    title: 'Memory and Learning Study',
    description: 'Research examining the relationship between memory formation and learning patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
    location: 'Neuroscience Center',
    date: addHours(today, 24),
    defaultIncentiveType: IncentiveType.PAYMENT,
    defaultPaymentAmount: 25,
    status: StudyStatus.ACTIVE,
    duration: 90,
    requirements: [
      'Must be 18-65 years old',
      'Native English speaker',
      'No current medications affecting memory'
    ],
    maxParticipants: 30,
    timeSlots: [
      {
        id: '2-1',
        startTime: setHours(setMinutes(addHours(today, 24), 0), 10),
        endTime: setHours(setMinutes(addHours(today, 24), 0), 12),
        capacity: 15,
        attendees: []
      },
      {
        id: '2-2',
        startTime: setHours(setMinutes(addHours(today, 24), 0), 14),
        endTime: setHours(setMinutes(addHours(today, 24), 0), 16),
        capacity: 15,
        attendees: []
      }
    ]
  }
];