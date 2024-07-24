/**
 * Interface for processor options.
 * @interface ProcessorOptions
 */
export interface ProcessorOptions {
  url:
    | 'copy'
    | 'custom'
    | 'inline'
    | 'rebase'
    | ((asset: { url: string }) => string);
  options: any;
}
