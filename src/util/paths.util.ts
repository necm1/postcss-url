import { resolve, dirname, join, extname } from 'path';
import fs from 'fs';

/**
 * Resolves a relative path based on a base path.
 * @param {string | string[]} basePath - The base path or an array of base paths.
 * @param {string} relativePath - The relative path to resolve.
 * @returns {Promise<string>} The resolved path.
 */
export async function resolvePath(
  basePath: string | string[],
  relativePath: string,
): Promise<string> {
  if (Array.isArray(basePath)) {
    for (const base of basePath) {
      const resolved = resolve(base, relativePath);
      if (
        await fs.promises
          .access(resolved)
          .then(() => true)
          .catch(() => false)
      ) {
        return resolved;
      }
    }
    throw new Error(`Cannot resolve path: ${relativePath}`);
  } else {
    const resolved = resolve(basePath, relativePath);
    if (
      await fs.promises
        .access(resolved)
        .then(() => true)
        .catch(() => false)
    ) {
      return resolved;
    }
    throw new Error(`Cannot resolve path: ${relativePath}`);
  }
}

/**
 * Gets the relative path between a base path and a target path.
 * @param {string} basePath - The base path.
 * @param {string} targetPath - The target path.
 * @returns {string} The relative path.
 */
export function getRelativePath(basePath: string, targetPath: string): string {
  return join(basePath, targetPath);
}

/**
 * Gets the directory name of a file path.
 * @param {string} filePath - The file path.
 * @returns {string} The directory name.
 */
export function getDirname(filePath: string): string {
  return dirname(filePath);
}

/**
 * Gets the extension name of a file path.
 * @param {string} filePath - The file path.
 * @returns {string} The extension name.
 */
export function getExtname(filePath: string): string {
  return extname(filePath);
}
