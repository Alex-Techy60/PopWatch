// src/utils/formatTime.js
/**
 * @param {number|string} time 
 * @param {boolean} isDate 
 * @returns {string}
 */
export function formatTime(time, isDate = false) {
  if (isDate) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((new Date(time).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return rtf.format(daysDifference, 'day');
  }
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}