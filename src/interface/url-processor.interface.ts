/**
 * Interface for URL processor options.
 * @interface URLProcessorOptions
 */
export interface URLProcessorOptions {
  basePath: string | string[];
  assetsPath: string;
  useHash?: boolean;
  hashOptions?: {
    length?: number;
    append?: boolean;
  };
  filterExtensions?: string[];
  fileNameFormat?: string;
}
