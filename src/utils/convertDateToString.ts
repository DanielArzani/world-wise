/**
 * Convert a given Date object to a formatted string in the format 'YYYY-MM-DD'.
 *
 * @param date - The Date object to be converted.
 * @returns The formatted date string in 'YYYY-MM-DD' format.
 */
export default function convertDateToString(date: Date): string {
  // Convert the date object to an ISO string format 'YYYY-MM-DDTHH:MM:SS.sssZ'
  const isoString = date.toISOString();

  // Split the ISO string at 'T' to separate date and time, and return only the date part.
  return isoString.split('T')[0];
}
