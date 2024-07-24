import { URLProcessorOptions } from './url-processor.interface';

/**
 * Interface for processor options.
 * @interface ProcessorOptions
 */
export interface ProcessorOptions extends URLProcessorOptions {
  url:
    | 'copy'
    | 'custom'
    | 'inline'
    | 'rebase'
    | ((asset: { url: string }) => string);
}
