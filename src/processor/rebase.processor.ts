import path from 'path';
import { resolvePath, getRelativePath } from '../util/paths.util';
import { AbstractProcessor } from './abstract-processor';

/**
 * Processor for rebasing file paths.
 * @class RebaseProcessor
 * @extends AbstractProcessor
 */
export class RebaseProcessor extends AbstractProcessor {
  private options: any;

  constructor(options: any) {
    super();
    this.options = options;
  }

  /**
   * Processes a list of file paths by rebasing them.
   * @param {string[]} filePaths - The list of file paths to process.
   * @returns {Promise<string[]>} A list of rebased file paths.
   */
  public async process(filePaths: string[]): Promise<string[]> {
    const processedFiles: string[] = [];
    for (const filePath of filePaths) {
      const absolutePath = await resolvePath(this.options.basePath, filePath);
      const relativePath = getRelativePath(
        this.options.assetsPath,
        absolutePath,
      );
      processedFiles.push(relativePath.split(path.sep).join('/'));
    }
    return processedFiles;
  }
}

// release test
