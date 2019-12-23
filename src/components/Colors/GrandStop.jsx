import { h, Component } from 'preact'

export default class GrandStop extends Component {

  changeColor (rgbColor) {
    const extract = rgbColor.replace("rgb(", "").replace(")", "").split(', ')

    this.props.onChange("rgb", extract)
  }

  render ({ gradients }) {
    const gradientItems = gradients.map(grandient => {
      return <li title="Click to set color" onClick={this.changeColor.bind(this, grandient)} style={`background-color: ${grandient};`}></li>
    })

    return (
      <div className="section gradstop-wrapper">
        <div className="label">
          <span className="heading">Gradient</span> color stops:
        </div>
        <div className="content">
          <ul className="gradient-wrapper">
            {gradientItems}
          </ul>
        </div>
      </div>
    )
  }
}