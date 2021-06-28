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
        hex: converter.cmyk.toHex(value),
        rgb: converter.cmyk.toRgb(value),
        hsl: converter.cmyk.toHsl(value),
        cmyk: value,
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

export const calculateColor = (id, value, animated) => {
  const { cssVariable, colors, contrast, gradients } = generateCssColor({
    id, value
  });

  document.body.style.cssText = cssVariable
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
    gradients: gradients.reverse(),
  };
};

export const generateCssColor = ({ id, value }) => {
  const colors = colorConvert(id, value);
  const contrast = yiqContrastRatio(colors.rgb);
  const gradients = generateGrandients(colors.hex);

  const textColor =
    contrast.result === "black" ? gradients[7] : `rgb(${colors.rgb.join(", ")})`;
  const secondaryColor =
    contrast.result === "black" ? gradients[1] : gradients[7];
  const darkColor = contrast.result === "black" ? gradients[7] : gradients[1];

  const darkTransparent = darkColor
    .replace("rgb", "rgba")
    .replace(")", ", 0.98)");

  let cssVariable = [
    ["primary-color", `rgb(${colors.rgb.join(", ")})`],
    ["secondary-color", secondaryColor],
    ["text-color", textColor],
    ["dark-color", darkColor],
    ["dark-transparent-color", darkTransparent],
    ["contrast-color", contrast.result],
  ];

  cssVariable = cssVariable.filter(([name, value]) => name !== null)
    .map(([name, value]) => {
      return `--${name}: ${value};`;
    });

  for (const [ index, gradient ] of Object.entries(gradients.reverse())) {
    const n = ((Number(index) + 1) * 100);

    cssVariable.push(`--gradient-${n}: ${gradient};`);
  }

  return {
    colors, contrast, gradients, cssVariable
  }
}

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
      toString(color) {
        if (typeof color == "object" && color.length == 1) {
          color = color[0];
        }

        return `#${color}`;
      },
    },
    rgb: {
      inputLength: 3,
      inputMaxLength: 255,
      inputType: "number",
      toString(color) {
        return `rgb(${normalize(color).join(", ")})`;
      },
    },
    hsl: {
      inputLength: 3,
      inputMaxLength: 200,
      inputType: "number",
      toString(color) {
        return `hsl(${normalize(color).join(", ")})`;
      },
    },
    cmyk: {
      inputLength: 4,
      inputMaxLength: 255,
      inputType: "number",
      toString(color) {
        return `cmyk(${normalize(color).join(", ")})`;
      },
    },
  };

  return properties[id];
};
