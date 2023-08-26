/**
 * Convert a country code to its corresponding flag emoji.
 * @param {string} countryCode - The country code (e.g., "US" for United States).
 * @returns {string} The flag emoji corresponding to the given country code.
 */
export function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
