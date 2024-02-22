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
