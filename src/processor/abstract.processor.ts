/**
 * Abstract class for processors.
 * @abstract
 * @class AbstractProcessor
 */
export abstract class AbstractProcessor {
  /**
   * Processes a list of file paths.
   * @abstract
   * @param {string[]} filePaths - The list of file paths to process.
   * @returns {Promise<string[]>} A list of processed file paths.
   */
  abstract process(filePaths: string[]): Promise<string[]>;
}
