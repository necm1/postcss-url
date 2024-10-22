import { Processor } from './processor';
import { ProcessorOptions } from './interface/processor.interface';
import { AbstractProcessor } from './processor/abstract.processor';

/**
 * PostCSS URL Plugin
 *
 * This plugin processes URLs in CSS files according to the specified options.
 * It supports various URL transformation types such as 'copy', 'custom', 'inline', and 'rebase'.
 *
 * @param {ProcessorOptions | ProcessorOptions[]} options - The options for the processor(s).
 *  - `url`: The type of URL processing to perform or a custom URL function.
 *  - `options`: Additional options specific to the chosen URL processing type.
 *
 * Example usage:
 *
 * ```typescript
 * postcss()
 *   .use(urlPlugin({
 *     url: 'copy',
 *     basePath: 'node_modules/bootstrap',
 *     assetsPath: 'dist/img',
 *     useHash: true,
 *     filterExtensions: ['.png', '.jpg', '.gif']
 *   }))
 *   .process(css, { from: 'src/stylesheet/index.css', to: 'dist/index.css' })
 *   .then(result => {
 *     console.log(result.css);
 *   });
 * ```
 *
 * @returns {Function} A PostCSS plugin function.
 */
const urlPlugin = (options: ProcessorOptions | ProcessorOptions[]) => {
  return {
    postcssPlugin: 'postcss-url',
    Once: async (root, { result }) => {
      const processorsList = Array.isArray(options) ? options : [options];

      for (const processorOptions of processorsList) {
        const processorType =
          typeof processorOptions.url === 'function'
            ? 'custom'
            : processorOptions.url;

        const processor = new Processor({
          ...processorOptions,
          url: processorType,
        });

        const filePaths: string[] = [];

        root.walkDecls((decl: { value: string }) => {
          const urlMatch = decl.value.match(/url\(['"]?([^'")]+)['"]?\)/);
          if (urlMatch) {
            const urlPath = urlMatch[1];
            filePaths.push(urlPath);
          }
        });

        try {
          const processedFiles = await processor.process(filePaths);
          processedFiles.forEach((filePath, index) => {
            const urlPath = filePaths[index];

            root.walkDecls((decl: { value: string; source: any }) => {
              if (decl.value.includes(urlPath)) {
                decl.value = decl.value.replace(urlPath, filePath);
              }
            });
          });
        } catch (error) {
          result.warn(`Error processing files: ${error.message}`);
        }
      }
    },
  };
};

urlPlugin.postcss = true;

export { AbstractProcessor };
export default urlPlugin;
