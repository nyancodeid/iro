import { h, Component } from "preact"

export default class Contrast extends Component {

  render ({ contrast }) {
    const contrastResult = (contrast >= 128) ? 'black' : 'white'

    return (
      <div className="section contrast-wrapper">
        <div className="label">
          <span className="heading">YIQ</span> Contrast Ratio:
        </div> 
        <div className="content">
          {contrast.toFixed(2)} ({contrastResult})
        </div>
      </div>
    )
  }
}