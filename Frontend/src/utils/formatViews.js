// src/utils/formatViews.js
/**
 * @param {number} views 
 * @returns {string}
 */
export function formatViews(views) {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
}