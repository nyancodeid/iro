import { h, Component } from "preact"
import { randomRGB } from "../calculate"

export default class RandomColor extends Component {

  onRandomColor = () => {
    const rgbColor = randomRGB()

    this.props.onChange("rgb", rgbColor)
  }

  render (_) {
    return (
      <div className="section random-wrapper">
        <div className="label">
          <span className="heading">Generate</span> random color:
        </div>
        <div className="content">
          <button className="button" onClick={this.onRandomColor}>RANDOM COLOR</button>
        </div>
      </div>
    )
  }
}