import { Processor } from './processor';
import { ProcessorOptions } from './interface/processor.interface';
import path from 'path';
import { AbstractProcessor } from './processor/abstract-processor';

const urlPlugin = (options: ProcessorOptions) => {
  const processor = new Processor(options);

  return {
    postcssPlugin: 'postcss-url',
    Once: async (root, { result }) => {
      const filePaths: string[] = [];

      root.walkDecls((decl: { value: string }) => {
        const urlMatch = decl.value.match(/url\(['"]?([^'")]+)['"]?\)/);
        if (urlMatch) {
          const urlPath = urlMatch[1];
          filePaths.push(urlPath);
        }
      });

      try {
        const copiedFiles = await processor.process(filePaths);
        copiedFiles.forEach((filePath, index) => {
          const urlPath = filePaths[index];
          root.walkDecls((decl: { value: string; source: any }) => {
            if (decl.value.includes(urlPath)) {
              const relativePath = path.relative(
                path.dirname(decl.source.input.file),
                filePath,
              );
              decl.value = decl.value.replace(
                urlPath,
                relativePath.split(path.sep).join('/'),
              );
            }
          });
        });
      } catch (error) {
        result.warn(`Error processing files: ${error.message}`);
      }
    },
  };
};

urlPlugin.postcss = true;

export { AbstractProcessor };
export default urlPlugin;
