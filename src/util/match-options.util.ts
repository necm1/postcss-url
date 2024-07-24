/**
 * Checks if the file path matches any of the given extensions.
 * @param {string} filePath - The file path to check.
 * @param {string[]} extensions - The list of extensions to match against.
 * @returns {boolean} True if the file path matches any of the extensions, false otherwise.
 */
export function matchExtensions(
  filePath: string,
  extensions: string[],
): boolean {
  return extensions.some((ext) => filePath.endsWith(ext));
}

/**
 * Checks if the file path matches any of the given patterns.
 * @param {string} filePath - The file path to check.
 * @param {string[]} patterns - The list of patterns to match against.
 * @returns {boolean} True if the file path matches any of the patterns, false otherwise.
 */
export function matchPattern(filePath: string, patterns: string[]): boolean {
  return patterns.some((pattern) => new RegExp(pattern).test(filePath));
}

/**
 * Checks if the value is a multi-value (array with more than one element).
 * @param {string | string[]} value - The value to check.
 * @returns {boolean} True if the value is a multi-value, false otherwise.
 */
export function isMulti(value: string | string[]): boolean {
  return Array.isArray(value) && value.length > 1;
}

/**
 * Checks if the value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}
