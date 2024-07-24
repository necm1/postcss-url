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
declare const urlPlugin: {
    (options: ProcessorOptions | ProcessorOptions[]): {
        postcssPlugin: string;
        Once: (root: any, { result }: {
            result: any;
        }) => Promise<void>;
    };
    postcss: boolean;
};
export { AbstractProcessor };
export default urlPlugin;
