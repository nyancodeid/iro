/**
 * Extracted from: https://github.com/Qix-/color-convert/blob/master/conversions.js
 **/
export const hex = {
  toRgb(args) {
    const match = args.match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }

    let colorString = match[0];

    if (match[0].length === 3) {
      colorString = colorString
        .split("")
        .map((char) => {
          return char + char;
        })
        .join("");
    }

    const integer = parseInt(colorString, 16);
    const r = (integer >> 16) & 0xff;
    const g = (integer >> 8) & 0xff;
    const b = integer & 0xff;

    return [r, g, b];
  },
  toHsl(args) {
    const _rgb = hex.toRgb(args);
    return rgb.toHsl(_rgb);
  },
  toCmyk(args) {
    const _rgb = hex.toRgb(args);
    return rgb.toCmyk(_rgb);
  },
};

export const rgb = {
  toHex(args) {
    const integer =
      ((Math.round(args[0]) & 0xff) << 16) +
      ((Math.round(args[1]) & 0xff) << 8) +
      (Math.round(args[2]) & 0xff);

    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  },
  toHsl(args) {
    const [ r, g, b ] = args.map(i => i / 255);
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;

    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }

    h = Math.min(h * 60, 360);

    if (h < 0) {
      h += 360;
    }

    const l = (min + max) / 2;

    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }

    return [h, s * 100, l * 100];
  },
  toCmyk(args) {
    const [ r, g, b ] = args.map(i => i / 255);

    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return [c * 100, m * 100, y * 100, k * 100];
  },
};

export const hsl = {
  toHex(args) {
    const _rgb = hsl.toRgb(args);
    return rgb.toHex(_rgb);
  },
  toRgb(args) {
    const h = args[0] / 360;
    const s = args[1] / 100;
    const l = args[2] / 100;
    let t2;
    let t3;
    let val;

    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }

    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }

    const t1 = 2 * l - t2;

    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      t3 = h + (1 / 3) * -(i - 1);
      if (t3 < 0) {
        t3++;
      }

      if (t3 > 1) {
        t3--;
      }

      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }

      rgb[i] = val * 255;
    }

    return rgb;
  },
  toCmyk(args) {
    const _rgb = hsl.toRgb(args);
    return rgb.toCmyk(_rgb);
  },
};

export const cmyk = {
  toHex(args) {
    const _rgb = cmyk.toRgb(args);
    return rgb.toHex(_rgb);
  },
  toRgb(args) {
    const [ c, m, y, k ] = args.map(i => i / 100);

    const r = 1 - Math.min(1, (c / 100) * (1 - k) + k);
    const g = 1 - Math.min(1, (m / 100) * (1 - k) + k);
    const b = 1 - Math.min(1, (y / 100) * (1 - k) + k);

    return [r * 255, g * 255, b * 255];
  },
  toHsl(args) {
    const _rgb = cmyk.toRgb(args);
    return rgb.toHsl(_rgb);
  },
};
