/**
 * Converts an ISO date string to a human-readable format.
 *
 * @param dateString - The ISO date string to be formatted.
 * @returns The date in a human-readable format.
 *
 * @example
 * const exampleDateString = '2027-10-31T15:59:59.138Z';
 * console.log(formatDate(exampleDateString)); // Outputs: October 31, 2027
 */
export default function formatDate(dateString: string): string {
  // Parse the input string into a Date object
  const date = new Date(dateString);

  // Define the desired output format
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Convert the Date object to the desired string format and return
  return date.toLocaleDateString('en-US', options);
}
