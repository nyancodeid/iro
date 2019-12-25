import { h, Component } from 'preact'

export default class ColorConvert extends Component {
  state = {
  }

  colorChanged (id) {
    this.props.onChange(id)
  }

  render ({ types }) {
    const activeConvert = types
      .filter(type => !type.selected)
      .map(type => {
        return <li className="button" onClick={this.colorChanged.bind(this, type.id)}>{type.title}</li>
      })

    return (
      <div className="section convert-wrapper">
        <div className="label">
          <span className="heading">Convert</span> to:
        </div>
        <div className="content">
          <ul className="convert-wrapper">
            {activeConvert}
          </ul>
        </div>
      </div>
    )
  }
}