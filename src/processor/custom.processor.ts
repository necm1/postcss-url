import { AbstractProcessor } from './abstract-processor';

/**
 * Processor for custom processing.
 * @class CustomProcessor
 * @extends AbstractProcessor
 */
export class CustomProcessor extends AbstractProcessor {
  private options: any;

  constructor(options: any) {
    super();
    this.options = options;
  }

  /**
   * Processes a list of file paths with custom logic.
   * @param {string[]} filePaths - The list of file paths to process.
   * @returns {Promise<string[]>} A list of processed file paths.
   */
  public async process(filePaths: string[]): Promise<string[]> {
    // Implement custom processing logic here
    // This is a placeholder implementation
    return filePaths.map(
      (filePath) => `${this.options.customPrefix || ''}${filePath}`,
    );
  }
}
