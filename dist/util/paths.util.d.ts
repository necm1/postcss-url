/**
 * Resolves a relative path based on a base path.
 * @param {string | string[]} basePath - The base path or an array of base paths.
 * @param {string} relativePath - The relative path to resolve.
 * @returns {Promise<string>} The resolved path.
 */
export declare function resolvePath(basePath: string | string[], relativePath: string): Promise<string>;
/**
 * Gets the relative path between a base path and a target path.
 * @param {string} basePath - The base path.
 * @param {string} targetPath - The target path.
 * @returns {string} The relative path.
 */
export declare function getRelativePath(basePath: string, targetPath: string): string;
/**
 * Gets the directory name of a file path.
 * @param {string} filePath - The file path.
 * @returns {string} The directory name.
 */
export declare function getDirname(filePath: string): string;
/**
 * Gets the extension name of a file path.
 * @param {string} filePath - The file path.
 * @returns {string} The extension name.
 */
export declare function getExtname(filePath: string): string;
