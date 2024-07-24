import { AbstractProcessor } from './abstract.processor';
/**
 * Processor for custom processing.
 * @class CustomProcessor
 * @extends AbstractProcessor
 */
export declare class CustomProcessor extends AbstractProcessor {
    private options;
    constructor(options: any);
    /**
     * Processes a list of file paths with custom logic.
     * @param {string[]} filePaths - The list of file paths to process.
     * @returns {Promise<string[]>} A list of processed file paths.
     */
    process(filePaths: string[]): Promise<string[]>;
}
