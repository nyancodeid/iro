Number.prototype.decimalLength = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};

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

/**
 * Normalize float number to number without decimal
 * @param {String[]|Number[]} numbers
 * @returns {Number[]}
 **/
export const normalize = (numbers) => {
  return numbers.map((n) => {
    if (Number(n).decimalLength() > 0) {
      return Number(Number(n).toFixed(0));
    } else {
      return Number(n);
    }
  });
};

export const isString = (data) => {
  if (!data) return false;

  return typeof data === "string";
};

/**
 * Check is website running on PWA mode.
 * @returns {Boolean}
 */
export const isRunningOnPWA = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};
