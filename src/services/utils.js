/**
 * Random Number from range min to max
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const getRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Copy text to clipboard
 * @param {String} value
 */
export const copyToClipboard = (value) => {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
};


export const normalize = (numbers) => {
  return numbers.map(n => Number(Number(n).toFixed(0)));
}