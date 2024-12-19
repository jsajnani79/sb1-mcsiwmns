import { format, parse, isValid } from 'date-fns';

export function formatDate(date: Date | string | undefined): string {
  if (!date) return 'Not specified';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  
  return format(dateObj, 'MMMM d, yyyy');
}

export function formatTime(date: Date | string | undefined): string {
  if (!date) return 'Not specified';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return 'Invalid time';
  
  return format(dateObj, 'h:mm a');
}

export function formatDateTime(date: Date | string | undefined): string {
  if (!date) return 'Not specified';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return 'Invalid date/time';
  
  return format(dateObj, 'MMMM d, yyyy h:mm a');
}

export function parseDateString(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Try common date formats
  const formats = [
    'MM/dd/yy',
    'MM/dd/yyyy',
    'M/d/yy',
    'M/d/yyyy',
    'yyyy-MM-dd',
    'MMM d, yyyy',
    'MMMM d, yyyy'
  ];

  for (const fmt of formats) {
    try {
      const date = parse(dateStr, fmt, new Date());
      if (isValid(date)) return date;
    } catch {
      continue;
    }
  }

  return null;
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd');
}