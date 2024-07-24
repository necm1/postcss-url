import path from 'path';
import { getFile } from '../util/get-file.util';
import { AbstractProcessor } from './abstract-processor';

/**
 * Processor for inlining files as base64.
 * @class InlineProcessor
 * @extends AbstractProcessor
 */
export class InlineProcessor extends AbstractProcessor {
  private options: any;

  constructor(options: any) {
    super();
    this.options = options;
  }

  /**
   * Processes a list of file paths by inlining them as base64.
   * @param {string[]} filePaths - The list of file paths to process.
   * @returns {Promise<string[]>} A list of base64 encoded file paths.
   */
  public async process(filePaths: string[]): Promise<string[]> {
    const processedFiles: string[] = [];

    for (const filePath of filePaths) {
      const content = await getFile(filePath, this.options.basePath);
      const base64Content = content.toString('base64');
      const mimeType = this.getMimeType(filePath);
      processedFiles.push(`data:${mimeType};base64,${base64Content}`);
    }
    return processedFiles;
  }

  /**
   * Gets the MIME type of a file based on its extension.
   * @param {string} filePath - The file path.
   * @returns {string} The MIME type.
   */
  private getMimeType(filePath: string): string {
    const ext = path.extname(filePath).slice(1);
    const mimeTypes: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }
}
