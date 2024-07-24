import { ProcessorOptions } from './interface/processor.interface';
/**
 * Main processor class that dynamically loads and executes the specified processor.
 * @class Processor
 */
export declare class Processor {
    private processor;
    constructor(options: ProcessorOptions);
    /**
     * Dynamically loads the specified processor.
     * @param {string | ((asset: any) => string)} type - The type of processor to load or a custom URL function.
     * @param {any} options - The options for the processor.
     * @returns {AbstractProcessor} The loaded processor.
     */
    private loadProcessor;
    /**
     * Processes a list of file paths.
     * @param {string[]} filePaths - The list of file paths to process.
     * @returns {Promise<string[]>} A list of processed file paths.
     */
    process(filePaths: string[]): Promise<string[]>;
}
