import convert from "color-convert";
import gradstop from "gradstop";

import { getRange, normalize } from "./utils";

/**
 * Color Validation
 * @param {String} from hex, rgb, hsl, cmyk
 * @param {String|Number[]} value
 * @returns
 */
export const colorValidate = (from, value) => {
  switch (from) {
    case "hex":
      if (typeof value == "object" && value.length == 1) {
        value = value[0];
      } 

      return (
        typeof value === "string" &&
        value.length === 6 &&
        !isNaN(Number("0x" + value))
      );
    case "rgb":
      if (typeof value === "object" && value.length === 3) {
        const mapValue = value.filter(
          (item) => typeof item === "number" && item <= 255
        );

        return mapValue.length === 3 ? true : false;
      } else {
        return false;
      }
    case "hsl":
      if (typeof value === "object" && value.length === 3) {
        const mapValue = value.filter(
          (item) => typeof item === "number" && item <= 200
        );

        return mapValue.length === 3 ? true : false;
      } else {
        return false;
      }
    case "cmyk":
      if (typeof value === "object" && value.length === 4) {
        const mapValue = value.filter(
          (item) => typeof item === "number" && item <= 255
        );

        return mapValue.length === 4 ? true : false;
      } else {
        return false;
      }
    default:
      break;
  }
};
/**
 * Color Convert
 * @param {String} from hex, rgb, hsl, cmyk
 * @param {String} value
 * @returns
 */
export const colorConvert = (from, value) => {
  switch (from) {
    case "hex":
      return {
        hex: value,
        rgb: convert.hex.rgb(value),
        hsl: convert.hex.hsl(value),
        cmyk: convert.hex.cmyk(value),
      };
    case "rgb":
      return {
        hex: convert.rgb.hex(value),
        rgb: value,
        hsl: convert.rgb.hsl(value),
        cmyk: convert.rgb.cmyk(value),
      };
    case "hsl":
      return {
        hex: convert.cmyk.hex(value),
        rgb: convert.cmyk.rgb(value),
        hsl: convert.cmyk.hsl(value),
        cmyk: value,
      };
    case "cmyk":
      return {
        hex: convert.cmyk.hex(value),
        rgb: convert.cmyk.rgb(value),
        hsl: convert.cmyk.hsl(value),
        cmyk: value,
      };
    default:
      break;
  }
};
/**
 * YIQ Contrast Ration
 * @param {Number[]} rgb
 * @returns black or white
 */
export const yiqContrastRatio = ([r, g, b]) => {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return {
    yiq,
    result: yiq >= 128 ? "black" : "white",
  };
};

/**
 * Get YIQ Contrast Color
 * @param {Number} yiq
 * @returns {String} black or white
 */
export const yiqContrastColor = (yiq) => {
  return yiq >= 128 ? "black" : "white";
}

/**
 * Generate Gradient
 * @param {String} hex
 * @returns {String[]}
 */
export const generateGrandients = (hex) => {
  const rgbColor = convert.hex.rgb(hex);
  const hexResult = gradstop({
    stops: 8,
    inputFormat: "hex",
    colorArray: ["#212121", `#${hex}`, "#FFFFFF"],
  });

  return gradstop({
    stops: 8,
    inputFormat: "rgb",
    colorArray: [hexResult[1], `rgb(${rgbColor.join(",")})`, hexResult[6]],
  });
};
/**
 * Random RGB Color
 * @returns {Number[]}
 */
export const generateRandomColor = () => {
  return Array(3)
    .fill(0)
    .map(() => getRange(1, 255));
};

export const calculateColor = (id, value, animated) => {
  const colors = colorConvert(id, value);
  const contrast = yiqContrastRatio(colors.rgb);
  const gradients = generateGrandients(colors.hex);

  const textColor =
    contrast.result === "black" ? gradients[7] : `#${colors.hex}`;
  const secondaryColor =
    contrast.result === "black" ? gradients[1] : gradients[7];
  const darkColor =
    contrast.result === "black" ? gradients[7] : gradients[1];

  const darkTransparent = darkColor
    .replace('rgb', 'rgba')
    .replace(')', ', 0.98)');

  const cssVariable = [
    ["dark-color", darkColor],
    ["dark-transparent-color", darkTransparent],
    ["primary-color", `#${colors.hex}`],
    ["secondary-color", secondaryColor],
    ["text-color", textColor],
    ["contrast-color", contrast.result],
  ];

  document.body.style.cssText = cssVariable
    .filter(([name, value]) => name !== null)
    .map(([name, value]) => {
      return `--${name}: ${value};`;
    })
    .join("");

  document.body.style.cssText += animated
    ? `transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);`
    : "";

  if (contrast.result === "black") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return {
    colors,
    contrast,
    gradients,
  };
};

/**
 * Get color properties by type
 * @param {String} id hex,rgb,rgba,hsl
 */
export const getColorProperties = (id) => {
  const properties = {
    hex: {
      inputLength: 1,
      inputMaxLength: 6,
      inputType: "text",
      toString (color) {
        if (typeof color == "object" && color.length == 1) {
          color = color[0];
        }

        return `#${color}`
      }
    },
    rgb: {
      inputLength: 3,
      inputMaxLength: 255,
      inputType: "number",
      toString (color) {
        return `rgb(${normalize(color).join(', ')})`
      }
    },
    hsl: {
      inputLength: 3,
      inputMaxLength: 200,
      inputType: "number",
      toString (color) {
        return `hsl(${normalize(color).join(', ')})`
      }
    },
    cmyk: {
      inputLength: 4,
      inputMaxLength: 255,
      inputType: "number",
      toString (color) {
        return `cmyk(${normalize(color).join(', ')})`
      }
    }
  };

  return properties[id];
}

export const colorDiffPercentage = (prev, now) => {
  if (!prev && !now) return;

  let [ _r, _g, _b ] = prev;
  let [ __r, __g, __b ] = now;

  var p1 = (_r / 255) * 100;
  var p2 = (_g / 255) * 100;
  var p3 = (_b / 255) * 100;

  var perc1 = Math.round((p1 + p2 + p3) / 3);

  var p1 = (__r / 255) * 100;
  var p2 = (__g / 255) * 100;
  var p3 = (__b / 255) * 100;

  var perc2 = Math.round((p1 + p2 + p3) / 3);

  return Math.abs(perc1 - perc2);   
}