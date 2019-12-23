import { h, Component, render } from 'preact'
import './style.scss'
import IconWhite from './assets/icon-white.svg'
import IconBlack from './assets/icon-black.svg'

import ColorConvert from './components/Colors/Convert'
import ColorInput from './components/Colors/Input'
import GrandStop from './components/Colors/GrandStop'
import Contrast from './components/Colors/Contrast'
import RandomColor from './components/Colors/RandomColor'

import { colorConvert, yiqContrastRatio, generateGrandStop } from './components/calculate'

class App extends Component {
  state = {
    contrast: 0,
    grandStop: [],
    hex: '212121',
    types: [
      { title: 'HEX', id: 'hex', selected: true, value: '212121' },
      { title: 'RGB', id: 'rgb', selected: false, value: [33,33,33] },
      { title: 'CMYK', id: 'cmyk', selected: false, value: [0, 0, 0, 87] }
    ]
  }

  componentDidMount () {
    const active = this.state.types.find(type => type.selected)
    const { colors, contrast, grandStop } = this.colorChangeCalculation(active.id, active.value)

    this.setState({ contrast: contrast.yiq, grandStop, hex: colors.hex })
  }

  onTypeChanged = (id) => {
    const colorTypes = this.state.types.map(type => {
      return { ...type, selected: (type.id === id) ? true : false }
    })

    this.setState({ types: colorTypes })
  }

  colorChangeCalculation (id, value) {
    const colors = colorConvert(id, value)
    const contrast = yiqContrastRatio(colors.rgb)
    const grandStop = generateGrandStop(colors.hex)

    const textColor = (contrast.result === "black") ? grandStop[7] : `#${colors.hex}`
    const secondaryColor = (contrast.result === "black") ? grandStop[1] : grandStop[7] 

    document.body.style.cssText = `--primary-color: #${colors.hex};--secondary-color: ${secondaryColor};--text-color: ${textColor};`
    if (contrast.result === "black") document.body.classList.add("dark")
    else document.body.classList.remove("dark")

    return {
      colors,
      contrast,
      grandStop
    }
  }

  onColorChanged = (id, value) => {
    const { colors, contrast, grandStop } = this.colorChangeCalculation(id, value)

    const changed = this.state.types.map(type => {
      let colorValues = (type.id === "rgb") ? colors[type.id].map(i => Number(Number(i).toFixed(0))) : colors[type.id] 

      return { ...type, value: colorValues }
    })

    this.setState({ types: changed, contrast: contrast.yiq, grandStop, hex: colors.hex })
  }

  render (_, { types, contrast, grandStop, hex }) {
    const active = types.find(type => type.selected)
    const contrastResult = (contrast >= 128) ? 'black' : 'white'

    return <div id="content">
      <header>
        <div>
          <h1>IRO</h1>
          <span>Amazing colors tool</span>
        </div>
        <img src={(contrastResult === "white") ? IconWhite : IconBlack} alt=""/>
      </header>
      <div className="main">
        <div className="main-wrapper">
          <ColorInput type={active} onChange={this.onColorChanged} hex={hex} color={contrastResult} />
          <Contrast contrast={contrast} />
        </div>
      </div>
      <div className="navbar">
        <GrandStop gradients={grandStop} onChange={this.onColorChanged}></GrandStop>
        <ColorConvert types={types} onChange={this.onTypeChanged} onRandom={this.onColorChanged} />
        <RandomColor onChange={this.onColorChanged} />
      </div>
    </div>
  }
}

render(<App />, document.getElementById('root'))
