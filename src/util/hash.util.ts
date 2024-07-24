import { randomBytes, createHash } from 'crypto';

/**
 * Generates a random hash for a given content.
 * @param {string} content - The content to hash.
 * @param {number} [length=8] - The length of the hash.
 * @returns {Promise<string>} The generated hash.
 */
export async function generateHash(
  content: string,
  length: number = 8,
): Promise<string> {
  const seed = randomBytes(16).toString('hex'); // Generate a random seed
  const hash = createHash('sha256')
    .update(seed + content)
    .digest('hex');
  return hash.slice(0, length);
}
