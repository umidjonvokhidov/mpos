/**
 * Date formatting utilities
 */

/**
 * Format date to '01.05 Am • 2 Jun 2025' format
 */
export const formatDateWithTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  
  // Format time with proper AM/PM
  const ampm = hours >= 12 ? 'Pm' : 'Am';
  const displayHours = hours % 12 || 12;
  const timeString = `${displayHours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')} ${ampm}`;
  
  return `${timeString} • ${day} ${month} ${year}`;
};

/**
 * Format date to '2 Jun 2025' format
 */
export const formatDateOnly = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

/**
 * Format time to '01.05 Am' format
 */
export const formatTimeOnly = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const ampm = hours >= 12 ? 'Pm' : 'Am';
  const displayHours = hours % 12 || 12;
  
  return `${displayHours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')} ${ampm}`;
};

/**
 * Format date for different locales
 */
export const formatDateLocale = (date: Date, locale: string = 'en-US'): string => {
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  const timeString = timeFormatter.format(date).replace(':', '.');
  const dateString = dateFormatter.format(date);
  
  return `${timeString} • ${dateString}`;
};

/**
 * Get relative time (e.g., "2 hours ago", "yesterday")
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return formatDateOnly(date);
};
