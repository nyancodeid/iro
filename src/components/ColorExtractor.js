import { h, Component, Fragment } from 'preact';
import { Link } from 'preact-router';

import { extractImage } from './color-extractor/color-calculation';

class ColorExtractor extends Component {
  state = {
    colors: [],
    image: '',
  }

  onImageChanged = () => {
    const file = event.target

    extractImage(file).then(({ image, colors }) => {
      if (this.state.image !== '') {
        URL.revokeObjectURL(this.state.image)
      }

      this.setState({ colors, image })
    })
  }

  render (_, { image, colors }) {
    return (
      <Fragment>
        <input type="file" name="image" id="image" onChange={this.onImageChanged} />
        <div className="colors">
          <img src={image} alt="" style={{ width: `480px` }}/>
          <div className="color-boxs">
            { colors.map(color => {
              return (
              <Link className="color-box"
                style={{ backgroundColor: color.rgbText }}
                title={`#${color.hex.toUpperCase()}`}
                href={`/hex/${color.hex}`}></Link>
              )
            }) }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ColorExtractor
