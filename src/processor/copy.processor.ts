import fs from 'fs/promises';
import path from 'path';
import { URLProcessorOptions } from '../interface/url-processor.interface';
import { generateHash } from '../util/hash.util';
import { matchExtensions } from '../util/match-options.util';
import { getFile } from '../util/get-file.util';
import { AbstractProcessor } from './abstract.processor';

/**
 * Processor for copying files.
 * @class CopyProcessor
 * @extends AbstractProcessor
 */
export class CopyProcessor extends AbstractProcessor {
  private options: URLProcessorOptions;

  constructor(options: URLProcessorOptions) {
    super();
    this.options = options;
  }

  /**
   * Formats the file name based on the original name and hash.
   * @param {string} originalName - The original file name.
   * @param {string} hash - The hash to include in the file name.
   * @returns {string} The formatted file name.
   */
  private formatFileName(originalName: string, hash: string): string {
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext);
    let formattedName =
      this.options.fileNameFormat || '[name].[contenthash].[ext]';

    formattedName = formattedName
      .replace('[name]', name)
      .replace('[contenthash]', hash)
      .replace('[ext]', ext.slice(1));
    return formattedName;
  }

  /**
   * Copies a file to the destination path.
   * @param {string} filePath - The path of the file to copy.
   * @returns {Promise<string>} The path of the copied file.
   */
  private async copyFile(filePath: string): Promise<string> {
    if (!this.options.assetsPath || !this.options.basePath) {
      throw new Error(
        'assetsPath and basePath are required for copy processor',
      );
    }

    const content = await getFile(filePath, this.options.basePath);
    const fileName = path.basename(filePath);

    let hash = '';
    if (this.options.useHash) {
      hash = await generateHash(
        content.toString(),
        this.options.hashOptions?.length,
      );
    }

    const formattedFileName = this.formatFileName(fileName, hash);
    const destPath = path.join(this.options.assetsPath, formattedFileName);
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.writeFile(destPath, content);
    return path.join(this.options.assetsPath, formattedFileName);
  }

  /**
   * Processes a list of file paths.
   * @param {string[]} filePaths - The list of file paths to process.
   * @returns {Promise<string[]>} A list of processed file paths.
   */
  public async process(filePaths: string[]): Promise<string[]> {
    const processedFiles: string[] = [];

    for (const filePath of filePaths) {
      if (
        this.options.filterExtensions &&
        !matchExtensions(filePath, this.options.filterExtensions)
      ) {
        continue;
      }
      const destPath = await this.copyFile(filePath);
      processedFiles.push(destPath);
    }

    return processedFiles;
  }
}
