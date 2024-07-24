import path from 'path';
// import { resolvePath, getRelativePath } from '../util/paths.util';
import { AbstractProcessor } from './abstract.processor';
import { URLProcessorOptions } from '../interface/url-processor.interface';
import fs from 'fs/promises';

/**
 * Processor for rebasing file paths.
 * @class RebaseProcessor
 * @extends AbstractProcessor
 */
export class RebaseProcessor extends AbstractProcessor {
  private options: URLProcessorOptions;

  constructor(options: URLProcessorOptions) {
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
      const rebasedPath = await this.rebasePath(filePath);
      processedFiles.push(rebasedPath);
    }
    return processedFiles;
  }

  /**
   * Rebase the given file path to the new location.
   * @param {string} filePath - The file path to rebase.
   * @returns {string} The rebased file path.
   */
  private async rebasePath(filePath: string): Promise<string> {
    const { from, to, basePath } = this.options;

    if (from && to) {
      return path
        .join(to, path.relative(path.dirname(from), filePath))
        .replace(/\\/g, '/');
    } else if (basePath) {
      const resolvedBasePath = await this.resolveBasePath(filePath);
      return path
        .join(
          resolvedBasePath,
          path.relative(process.cwd(), path.relative(process.cwd(), filePath)),
        )
        .replace(/\\/g, '/');
    } else {
      throw new Error('Either from/to or basePath must be specified');
    }
  }

  /**
   * Resolves the file path based on the basePath option.
   * @param {string} filePath - The file path to resolve.
   * @returns {Promise<string>} The resolved file path.
   */
  private async resolveBasePath(filePath: string): Promise<string> {
    const { basePath } = this.options;

    if (!basePath) {
      throw new Error(`Cannot resolve path: ${filePath}`);
    }

    if (Array.isArray(basePath)) {
      for (const base of basePath) {
        const resolved = path.resolve(base, filePath);

        if (await this.pathExists(resolved)) {
          return base;
        }
      }

      throw new Error(`Cannot resolve path: ${filePath}`);
    } else {
      const resolved = path.resolve(basePath, filePath);

      if (await this.pathExists(resolved)) {
        return basePath;
      }

      throw new Error(`Cannot resolve path: ${filePath}`);
    }
  }

  /**
   * Checks if the given path exists.
   * @param {string} filePath - The path to check.
   * @returns {Promise<boolean>} True if the path exists, false otherwise.
   */
  private async pathExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
