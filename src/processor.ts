import { ProcessorOptions } from './interface/processor.interface';
import { AbstractProcessor } from './processor/abstract.processor';
import { resolve } from 'path';

/**
 * Main processor class that dynamically loads and executes the specified processor.
 * @class Processor
 */
export class Processor {
  private processor: AbstractProcessor;

  constructor(options: ProcessorOptions) {
    this.processor = this.loadProcessor(options.url, options);
  }

  /**
   * Dynamically loads the specified processor.
   * @param {string | ((asset: any) => string)} type - The type of processor to load or a custom URL function.
   * @param {any} options - The options for the processor.
   * @returns {AbstractProcessor} The loaded processor.
   */
  private loadProcessor(
    type: string | ((asset: any) => string),
    options: any,
  ): AbstractProcessor {
    if (typeof type === 'function') {
      return {
        process: async (filePaths: string[]) => {
          return filePaths.map((filePath) => type({ url: filePath }));
        },
      };
    }

    const processorPath = resolve(__dirname, `processor/${type}.processor`);

    switch (type) {
      case 'copy':
        return new (require(processorPath).CopyProcessor)(options);
      case 'custom':
        return new (require(processorPath).CustomProcessor)(options);
      case 'inline':
        return new (require(processorPath).InlineProcessor)(options);
      case 'rebase':
        return new (require(processorPath).RebaseProcessor)(options);
      default:
        throw new Error(`Unknown processor type: ${type}`);
    }
  }

  /**
   * Processes a list of file paths.
   * @param {string[]} filePaths - The list of file paths to process.
   * @returns {Promise<string[]>} A list of processed file paths.
   */
  public async process(filePaths: string[]): Promise<string[]> {
    return this.processor.process(filePaths);
  }
}
