import Matercolor from "matercolors";

import * as converter from "./converter";
import { getRange, normalize, minmax } from "./utils";

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
          (item, index) =>
            typeof item === "number" && item <= hsl.inputMaxLength(index)
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
 **/
export const calculateColor = (type, value) => {
  const { variable, cssVariable, colors, contrast, gradients } =
    generateCssColor({
      type,
      value,
    });

  document.body.style.cssText = cssVariable
    .map(([ name, value ]) => `${name}: ${value};`)
    .join("");

  if (contrast.result === "black") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return {
    colors,
    contrast,
    gradients,
    variable,
  };
};

export const generateCssColor = ({ type, value }) => {
  const colors = colorConvert(type, value);
  const contrast = yiqContrastRatio(colors.rgb);
  const gradients = generateGrandients(colors.hex);
  const rgb = getColorProperties("rgb");

  const material = generateMaterialPalette(colors.hsl);
  console.log(material.toGradient("rgb", true));

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

  cssVariable = cssVariable
    .filter(([name, value]) => name !== null)
    .map(([name, value]) => {
      return [`--${name}`, value];
    });

  for (const [index, gradient] of Object.entries(gradients.slice().reverse())) {
    const n = (Number(index) + 1) * 100;

    cssVariable.push([`--gradient-${n}`, gradient]);
  }

  let variable = {
    primary: normalize(colors.rgb),
    secondary: rgb.toArray(secondaryColor),
    text: rgb.toArray(textColor),
    contrast: contrast.result === "black" ? [0, 0, 0] : [255, 255, 255],
    variables: cssVariable,
  };

  return {
    colors,
    contrast,
    gradients: material.toGradient("rgb", true),
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

/**
 * @param {Number[]} rgb color
 * @returns {Number}
 */
export const getLuminance = (rgb) => {
  var a = rgb.map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 *
 * @param {Number[]|String} foreground
 * @param {Number[]|String} background
 * @returns
 */
export const calculateContrast = (foreground, background) => {
  if (typeof foreground === "string") {
    foreground = converter.hex.toRgb(foreground);
  }
  if (typeof background === "string") {
    background = converter.hex.toRgb(background);
  }

  const fg_luminance = getLuminance(foreground);
  const bg_luminance = getLuminance(background);

  const ratio =
    fg_luminance > bg_luminance
      ? (bg_luminance + 0.05) / (fg_luminance + 0.05)
      : (fg_luminance + 0.05) / (bg_luminance + 0.05);

  return {
    aa_lvl_lg: ratio < 1 / 3,
    aa_lvl_sm: ratio < 1 / 4.5,
    aaa_lvl_lg: ratio < 1 / 4.5,
    aaa_lvl_sm: ratio < 1 / 7,
  };
};

/**
 * @param {String} color hex
 * @source https://github.com/leodido/material-palette/blob/master/index.m.js
 */
export const generateMaterialPalette = (color) => {
  const hex = getColorProperties("hex");
  const hexColor = hex.toString(color).toLowerCase();
  const palette = new Matercolor(hexColor);

  const primaryIndex = Object.entries(palette.palette.primary)
    .slice(1, 10)
    .reverse()
    .findIndex(([index, value]) => hexColor === value);

  return {
    ...palette.palette.primary,
    primaryIndex,
    toGradient(type, withFormat = false, palette_color = "default") {
      let colors = palette.palette.primary;

      if (palette_color === "complementary") {
        colors = palette.palette.complementary;
      } else if (palette_color === "analogous.primary") {
        colors = palette.palette.analogous.primary;
      } else if (palette_color === "analogous.secondary") {
        colors = palette.palette.analogous.secondary;
      } else if (palette_color === "triadic.primary") {
        colors = palette.palette.triadic.primary;
      } else if (palette_color === "triadic.secondary") {
        colors = palette.palette.triadic.secondary;
      }

      const gradients = [];
      const typeProps = getColorProperties(type);
      for (const index in colors) {
        gradients.push(colors[index]);
      }
      return gradients
        .map((color) => colorConvert("hex", hex.toRaw(color))[type])
        .map((color) => (withFormat ? typeProps.toString(color) : color))
        .slice(1, 10)
        .reverse();
    },
    _raw_: palette,
  };
};
