import { h, Component, Fragment } from 'preact'
import { colorConvert, colorValidate } from './color-calculation'

export default class ColorInput extends Component {
  state = {
    value: ''
  }

  componentDidMount () {
    this.setState({ value: this.props.type.value })
  }

  componentWillReceiveProps ({ type }) {
    this.setState({ value: type.value })
  }

  onChange (id, index, event) {
    const value = event.target.value
    const stateValue = this.state.value

    switch (id) {
      case "hex":
        if (colorValidate(id, value)) {
          this.props.onChange(id, value)
        }
        break;
      case "rgb":
        stateValue[index] = (Number(value) > 255) ? 255 : Number(value)
        stateValue[index] = Number.isNaN(stateValue[index]) ? 0 : stateValue[index]
        this.setState({ value: stateValue })

        if (colorValidate(id, stateValue)) {
          this.props.onChange(id, stateValue)
        }
        break;
      case "hsl":
        stateValue[index] = (Number(value) > 100) ? 100 : Number(value)
        stateValue[index] = Number.isNaN(stateValue[index]) ? 0 : stateValue[index]
        this.setState({ value: stateValue })

        if (colorValidate(id, stateValue)) {
          this.props.onChange(id, stateValue)
        }
        break;
      case "cmyk":
        stateValue[index] = (Number.isNaN(Number(value))) ? 0 : Number(value)
        this.setState({ value: stateValue })
        
        if (colorValidate(id, stateValue)) {
          this.props.onChange(id, stateValue)
        }
        break;

      default:
        break;
    }

  }

  onCopy = () => {
    const type = this.props.type

    switch (type.id) {
      case "hex":
        this.copyText(`#${type.value}`)
        break;
      case "rgb":
        this.copyText(`rgb(${type.value.join(', ')})`)
        break;
      case "hsl":
        this.copyText(`hsl(${type.value.join(', ')})`)
        break;
      case "cmyk":
        this.copyText(`cmyk(${type.value.join(', ')})`)
        break;
      default:
        break;
    }
  }

  copyText (value) {
    const textArea = document.createElement('textarea')
    textArea.value = value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
  }

  render ({ type, hex, color }, { value }) {
    let inputElement = <span>Error</span>

    switch (type.id) {
      case "hex":
        const elementId = `${type.id}-input-0`
        inputElement = (
          <Fragment>
            <input type="text" id={elementId} value={value} onInput={this.onChange.bind(this, type.id, 0)} maxLength={6} />
            <label for={elementId} className="hidden-label">{elementId}</label>
          </Fragment>
        )
        break;
      case "rgb":
        inputElement = <div>
          {value.map((val, index) => {
            const elementId = `${type.id}-input-${index}`

            return (
              <Fragment>
                <input id={elementId} type="text" value={val} onInput={this.onChange.bind(this, type.id, index)} maxLength={3} />
                <label for={elementId} className="hidden-label">{elementId}</label>
              </Fragment>
            )
          })}
        </div>
        break;
      case "hsl":
        inputElement = <div>
          {value.map((val, index) => {
            const elementId = `${type.id}-input-${index}`

            return (
              <Fragment>
                <input id={elementId} type="text" value={val} onInput={this.onChange.bind(this, type.id, index)} maxLength={3} />
                <label for={elementId} className="hidden-label">{elementId}</label>
              </Fragment>
            )
          })}
        </div>
        break;
      case "cmyk":
        inputElement = <div>
          {value.map((val, index) => {
            const elementId = `${type.id}-input-${index}`
            return (
              <Fragment>
                <input id={elementId} type="text" value={val} onInput={this.onChange.bind(this, type.id, index)} maxLength={3} />
                <label for={elementId} className="hidden-label">{elementId}</label>
              </Fragment>
            )
          })}
        </div>
        break;
      default:
        break;
    }

    return (
      <div class="section input-wrapper">
        <div className="label">
          <span className="heading">{type.title}:</span>
          <svg onClick={this.onCopy} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9C10 7.89543 10.8954 7 12 7H18C19.1046 7 20 7.89543 20 9V19C20 20.1046 19.1046 21 18 21H12C10.8954 21 10 20.1046 10 19V9Z" fill={color}/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C5.89539 2 5 2.89542 5 4V14C5 15.1046 5.89539 16 7 16H8V9C8 6.79086 9.79089 5 12 5H15V4C15 2.89542 14.1046 2 13 2H7ZM15 7H12C10.8954 7 10 7.89542 10 9V16H13C14.1046 16 15 15.1046 15 14V7Z" fill={color} />
          </svg>

        </div>
        <div className={`content color-input ${type.id}`} style={{ color: hex }}>
          {inputElement}
        </div>
      </div>
    )
  }
}