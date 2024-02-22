export function getTimestamp(
  dateString: string,
  hours: number,
  minutes: number
) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Set hours and minutes of the date object
  date.setHours(hours);
  date.setMinutes(minutes);

  // Get the timestamp in milliseconds
  return date.getTime();
}

export function generateRandomId(length = 8) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

export function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  // Get the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed

  // Get the time components
  const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero if needed
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero if needed

  // Construct the date and time strings
  const dateString = `${year}/${month}/${day}`;
  const timeString = `${hours}:${minutes}`;

  return { dateString, timeString };
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function timeAgo(timestamp: number): string {
  const now = Date.now();
  
  // Check if the timestamp is in the future
  if (timestamp > now) {
    return ''; // Return empty string if timestamp is in the future
  }

  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years === 1 ? '' : 's'} ago`;
  } else if (months > 0) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }
}