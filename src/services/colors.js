import gradstop from "gradstop";

import * as converter from "./converter";
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
      const hex = getColorProperties("hex");
      if (typeof value == "object" && value.length == hex.inputLength) {
        value = value[0];
      }

      return (
        typeof value === "string" &&
        value.length === hex.inputMaxLength() &&
        !isNaN(Number("0x" + value))
      );
    case "rgb":
      const rgb = getColorProperties("rgb");
      if (typeof value === "object" && value.length === rgb.inputLength) {
        const mapValue = value.filter(
          (item) => typeof item === "number" && item <= rgb.inputMaxLength()
        );

        return mapValue.length === rgb.inputLength ? true : false;
      } else {
        return false;
      }
    case "hsl":
      const hsl = getColorProperties("hsl");
      if (typeof value === "object" && value.length === hsl.inputLength) {
        const mapValue = value.filter(
          (item, index) =>  (typeof item === "number" && item <= hsl.inputMaxLength(index))
        );

        return mapValue.length === hsl.inputLength ? true : false;
      } else {
        return false;
      }
    case "cmyk":
      const cmyk = getColorProperties("cmyk");
      if (typeof value === "object" && value.length === cmyk.inputLength) {
        const mapValue = value.filter(
          (item) => typeof item === "number" && item <= cmyk.inputMaxLength()
        );

        return mapValue.length === cmyk.inputLength ? true : false;
      } else {
        return false;
      }
    default:
      break;
  }
};
/**
 * Color Convert
 * @param {String} type hex, rgb, hsl, cmyk
 * @param {String} value
 * @returns
 */
export const colorConvert = (type, value) => {
  switch (type) {
    case "hex":
      return {
        hex: value,
        rgb: converter.hex.toRgb(value),
        hsl: converter.hex.toHsl(value),
        cmyk: converter.hex.toCmyk(value),
      };
    case "rgb":
      return {
        hex: converter.rgb.toHex(value),
        rgb: value,
        hsl: converter.rgb.toHsl(value),
        cmyk: converter.rgb.toCmyk(value),
      };
    case "hsl":
      return {
        hex: converter.hsl.toHex(value),
        rgb: converter.hsl.toRgb(value),
        hsl: value,
        cmyk: converter.hsl.toCmyk(value),
      };
    case "cmyk":
      return {
        hex: converter.cmyk.toHex(value),
        rgb: converter.cmyk.toRgb(value),
        hsl: converter.cmyk.toHsl(value),
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
};

/**
 * Generate Gradient
 * @param {String} hex
 * @returns {String[]}
 */
export const generateGrandients = (hex) => {
  const isValidColor = colorValidate("hex", hex);

  if (!isValidColor) return [];

  const rgbColor = converter.hex.toRgb(hex);
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

/**
 * @param {String} type
 * @param {String|Number[]} value
 * @param {Boolean} animated
 **/
export const calculateColor = (type, value, animated) => {
  const { variable, cssVariable, colors, contrast, gradients } =
    generateCssColor({
      type,
      value,
    });

  document.body.style.cssText = cssVariable.join("");

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
    gradients: gradients.reverse(),
    variable,
  };
};

export const generateCssColor = ({ type, value }) => {
  const colors = colorConvert(type, value);
  const contrast = yiqContrastRatio(colors.rgb);
  const gradients = generateGrandients(colors.hex);
  const rgb = getColorProperties("rgb");

  const textColor =
    contrast.result === "black" ? gradients[7] : rgb.toString(colors.rgb);
  const secondaryColor =
    contrast.result === "black" ? gradients[1] : gradients[7];
  const darkColor = contrast.result === "black" ? gradients[7] : gradients[1];

  const darkTransparent = darkColor
    .replace("rgb", "rgba")
    .replace(")", ", 0.98)");

  let cssVariable = [
    ["primary-color", rgb.toString(colors.rgb)],
    ["secondary-color", secondaryColor],
    ["text-color", textColor],
    ["dark-color", darkColor],
    ["dark-transparent-color", darkTransparent],
    ["contrast-color", contrast.result],
  ];

  let variable = {
    primary: normalize(colors.rgb),
    secondary: rgb.toArray(secondaryColor),
    text: rgb.toArray(textColor),
    contrast: contrast.result === "black" ? [0, 0, 0] : [255, 255, 255],
  };

  cssVariable = cssVariable
    .filter(([name, value]) => name !== null)
    .map(([name, value]) => {
      return `--${name}: ${value};`;
    });

  for (const [index, gradient] of Object.entries(gradients.reverse())) {
    const n = (Number(index) + 1) * 100;

    cssVariable.push(`--gradient-${n}: ${gradient};`);
  }

  return {
    colors,
    contrast,
    gradients,
    cssVariable,
    variable,
  };
};

/**
 * Get color properties by type
 * @param {String} id hex,rgb,rgba,hsl
 */
/**
 * Get color properties by type
 * @param {String} type hex,rgb,rgba,hsl
 */
export const getColorProperties = (type) => {
  const properties = {
    hex: {
      inputLength: 1,
      inputMaxLength() {
        return 6;
      },
      inputType: "text",
      toString(color) {
        if (typeof color == "object" && color.length == 1) {
          color = color[0];
        }

        return `#${color}`;
      },
    },
    rgb: {
      inputLength: 3,
      inputMaxLength() {
        return 255;
      },
      inputType: "number",
      toString(color) {
        return `rgb(${normalize(color).join(", ")})`;
      },
      /**
       * @param {String[]} colors
       * @return {Number[]} rgb array of number
       */
      toArray(color) {
        const numbs = color
          .replace("rgb(", "")
          .replace(")", "")
          .replace(" ", "")
          .split(",");

        return normalize(numbs);
      },
    },
    hsl: {
      inputLength: 3,
      inputMaxLength(i) {
        const length = [360, 100, 100];
        if (typeof i == "undefined") return length;
        return length[i];
      },
      inputType: "number",
      toString(color) {
        return `hsl(${normalize(color).join(", ")})`;
      },
    },
    cmyk: {
      inputLength: 4,
      inputMaxLength() {
        return 100;
      },
      inputType: "number",
      toString(color) {
        return `cmyk(${normalize(color).join(", ")})`;
      },
    },
  };

  return properties[type];
};
