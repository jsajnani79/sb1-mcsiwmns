// Add defaultPaymentAmount to Event interface
export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: Date;
  timeSlots: TimeSlot[];
  defaultIncentiveType: IncentiveType;
  defaultPaymentAmount?: number; // Add this field
}