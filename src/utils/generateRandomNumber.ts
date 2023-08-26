/**
 * Generates a random 8-digit number.
 *
 * @returns {number} An 8-digit random number between 10000000 and 99999999.
 */
export default function generateRandomNumber(): number {
  // Generate a random number between 10000000 and 99999999
  return Math.floor(10000000 + Math.random() * 90000000);
}
