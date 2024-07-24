import { URLProcessorOptions } from '../interface/url-processor.interface';
import { AbstractProcessor } from './abstract.processor';
/**
 * Processor for copying files.
 * @class CopyProcessor
 * @extends AbstractProcessor
 */
export declare class CopyProcessor extends AbstractProcessor {
    private options;
    constructor(options: URLProcessorOptions);
    /**
     * Formats the file name based on the original name and hash.
     * @param {string} originalName - The original file name.
     * @param {string} hash - The hash to include in the file name.
     * @returns {string} The formatted file name.
     */
    private formatFileName;
    /**
     * Copies a file to the destination path.
     * @param {string} filePath - The path of the file to copy.
     * @returns {Promise<string>} The path of the copied file.
     */
    private copyFile;
    /**
     * Processes a list of file paths.
     * @param {string[]} filePaths - The list of file paths to process.
     * @returns {Promise<string[]>} A list of processed file paths.
     */
    process(filePaths: string[]): Promise<string[]>;
}
