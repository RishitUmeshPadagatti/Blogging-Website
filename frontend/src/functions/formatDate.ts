export function formatDate(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
  
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    // Helper function to format date as "Jul 30" or "Aug 11, 2023"
    const formatDateString = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
      };
      if (date.getFullYear() !== now.getFullYear()) {
        options.year = 'numeric';
      }
      return date.toLocaleDateString(undefined, options);
    };
  
    if (diffInDays < 1) {
      return 'Today'; // Optionally handle "today" case
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else if (date.getFullYear() !== now.getFullYear()) {
      return formatDateString(date);
    } else {
      return formatDateString(date);
    }
  }