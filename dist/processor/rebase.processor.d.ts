import { AbstractProcessor } from './abstract.processor';
import { URLProcessorOptions } from '../interface/url-processor.interface';
/**
 * Processor for rebasing file paths.
 * @class RebaseProcessor
 * @extends AbstractProcessor
 */
export declare class RebaseProcessor extends AbstractProcessor {
    private options;
    constructor(options: URLProcessorOptions);
    /**
     * Processes a list of file paths by rebasing them.
     * @param {string[]} filePaths - The list of file paths to process.
     * @returns {Promise<string[]>} A list of rebased file paths.
     */
    process(filePaths: string[]): Promise<string[]>;
    /**
     * Rebase the given file path to the new location.
     * @param {string} filePath - The file path to rebase.
     * @returns {string} The rebased file path.
     */
    private rebasePath;
    /**
     * Resolves the file path based on the basePath option.
     * @param {string} filePath - The file path to resolve.
     * @returns {Promise<string>} The resolved file path.
     */
    private resolveBasePath;
    /**
     * Checks if the given path exists.
     * @param {string} filePath - The path to check.
     * @returns {Promise<boolean>} True if the path exists, false otherwise.
     */
    private pathExists;
}
