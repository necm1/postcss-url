/**
 * Reads the content of a file.
 * @param {string} filePath - The path of the file to read.
 * @param {string | string[]} basePath - The base path or an array of base paths.
 * @returns {Promise<Buffer>} The content of the file as a Buffer.
 */
export declare function getFile(filePath: string, basePath: string | string[]): Promise<Buffer>;
