import path from 'path';
import { getFile } from '../util/get-file.util';
import { AbstractProcessor } from './abstract.processor';
import { URLProcessorOptions } from '../interface/url-processor.interface';

/**
 * Processor for inlining files as base64.
 * @class InlineProcessor
 * @extends AbstractProcessor
 */
export class InlineProcessor extends AbstractProcessor {
  private options: URLProcessorOptions;

  constructor(options: URLProcessorOptions) {
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
      const content = await getFile(filePath, this.options.basePath || '');
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
      woff: 'font/woff',
      woff2: 'font/woff2',
      eot: 'application/vnd.ms-fontobject',
      ttf: 'font/ttf',
      webp: 'image/webp',
      otf: 'font/otf',
    };

    return mimeTypes[ext] || 'application/octet-stream';
  }
}
