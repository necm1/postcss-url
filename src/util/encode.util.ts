/**
 * Encodes a given content using URL encoding.
 * @param {string} content - The content to encode.
 * @returns {string} The encoded content.
 */
export function encode(content: string): string {
  return encodeURIComponent(content);
}
