import * as Vibrant from 'node-vibrant'

export function extractImage (file) {
  if (file.files && file.files[0]) {
    const imageURI = URL.createObjectURL(file.files[0])

    return Vibrant.from(imageURI)
      .getSwatches()
      .then(function(palette) {
        const _palette = Object.keys(palette).map(type => {
          return {
            rgb: palette[type]._rgb,
            rgbText: `rgb(${palette[type]._rgb.join(',')})`,
            population: palette[type]._population,
            hex: palette[type].getHex().replace('#', '')
          }
        })

        return { image: imageURI, colors: _palette }
      })
  }
}
