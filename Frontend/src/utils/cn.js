// src/utils/cn.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @param {...(string|object|undefined|null|false)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}