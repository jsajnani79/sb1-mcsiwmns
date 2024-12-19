// Update mock events to include defaultPaymentAmount
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Web Development Workshop',
    description: 'Learn the fundamentals of modern web development with React and TypeScript.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    location: 'Tech Hub - Room 101',
    date: today,
    defaultIncentiveType: IncentiveType.COURSE_CREDIT,
    timeSlots: [/* ... */]
  },
  {
    id: '2',
    title: 'Data Science Masterclass',
    description: 'Deep dive into data analysis, machine learning, and AI fundamentals.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    location: 'Innovation Center',
    date: addHours(today, 24),
    defaultIncentiveType: IncentiveType.PAYMENT,
    defaultPaymentAmount: 25.00,
    timeSlots: [/* ... */]
  }
];