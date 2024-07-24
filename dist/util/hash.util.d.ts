/**
 * Generates a random hash for a given content.
 * @param {string} content - The content to hash.
 * @param {number} [length=8] - The length of the hash.
 * @returns {Promise<string>} The generated hash.
 */
export declare function generateHash(content: string, length?: number): Promise<string>;
