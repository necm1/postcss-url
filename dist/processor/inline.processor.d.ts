import { AbstractProcessor } from './abstract.processor';
import { URLProcessorOptions } from '../interface/url-processor.interface';
/**
 * Processor for inlining files as base64.
 * @class InlineProcessor
 * @extends AbstractProcessor
 */
export declare class InlineProcessor extends AbstractProcessor {
    private options;
    constructor(options: URLProcessorOptions);
    /**
     * Processes a list of file paths by inlining them as base64.
     * @param {string[]} filePaths - The list of file paths to process.
     * @returns {Promise<string[]>} A list of base64 encoded file paths.
     */
    process(filePaths: string[]): Promise<string[]>;
    /**
     * Gets the MIME type of a file based on its extension.
     * @param {string} filePath - The file path.
     * @returns {string} The MIME type.
     */
    private getMimeType;
}
