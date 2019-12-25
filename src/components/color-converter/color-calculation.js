import convert from 'color-convert'
import gradstop from 'gradstop'

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export const colorValidate = (from, value) => {
  switch (from) {
    case 'hex':
      return typeof value === 'string' && value.length === 6 && !isNaN(Number('0x' + value))
    case 'rgb': 
      if (typeof value === 'object' && value.length === 3) {
        const mapValue = value.filter(item => (typeof item === "number" && item <= 255))

        return (mapValue.length === 3) ? true : false
      } else {
        return false
      }
    case 'cmyk': 
      if (typeof value === 'object' && value.length === 4) {
        const mapValue = value.filter(item => (typeof item === "number" && item <= 255))

        return (mapValue.length === 4) ? true : false
      } else {
        return false
      }
    default:
      break;
  }
}
export const colorConvert = (from, value) => {
  switch (from) {
    case 'hex':
      return {
        hex: value,
        rgb: convert.hex.rgb(value),
        cmyk: convert.hex.cmyk(value)
      }
    case 'rgb':
      return {
        hex: convert.rgb.hex(value),
        rgb: value,
        cmyk: convert.rgb.cmyk(value)
      }
    case 'cmyk':
      return {
        hex: convert.cmyk.hex(value),
        rgb: convert.cmyk.rgb(value),
        cmyk: value
      }
    default:
      break;
  }
}
export const yiqContrastRatio = (values) => {
  const [ r, g, b ] = values
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return {
    yiq,
    result: (yiq >= 128) ? 'black' : 'white'
  }
}
export const generateGrandStop = (hex) => {
  const hexToRgb = convert.hex.rgb(hex)
  const generation1 = gradstop({
    stops: 8,
    inputFormat: 'hex',
    colorArray: ['#212121', `#${hex}`, '#FFFFFF']
  })
  const generation2 = gradstop({
    stops: 8,
    inputFormat: 'rgb',
    colorArray: [generation1[1], `rgb(${hexToRgb.join(',')})`, generation1[6]]
  })

  return generation2
}
export const randomRGB = () => {
  return [
    getRandom(1, 255),
    getRandom(1, 255),
    getRandom(1, 255)
  ]
}