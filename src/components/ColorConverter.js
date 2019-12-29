import { h, Component } from 'preact';
import { route } from 'preact-router';

import ColorConvert from './color-converter/convert';
import ColorInput from './color-converter/input';
import GrandStop from './color-converter/grand-stop';
import Contrast from './color-converter/contrast';
import RandomColor from './color-converter/color-random';

import { connect } from 'unistore/preact'

import {
  colorConvert,
  yiqContrastRatio,
  generateGrandStop
} from './color-converter/color-calculation';

import actions from '../actions'

class ColorConverter extends Component {
  state = {
    contrast: 0,
    grandStop: [],
    hex: '212121',
    types: [
      { title: 'HEX', id: 'hex', selected: true, value: '212121' },
      { title: 'RGB', id: 'rgb', selected: false, value: [33,33,33] },
      { title: 'HSL', id: 'hsl', selected: false, value: [0,0,12.9] },
      { title: 'CMYK', id: 'cmyk', selected: false, value: [0, 0, 0, 87] }
    ]
  }

  componentDidMount () {
    if (Object.keys(this.props.matches).length == 2) {
      const { type: selectedType, hex } = this.props
      const { colors, contrast, grandStop } = this._colorChangeCalculation("hex", hex.toUpperCase(), false);

      const types = this.state.types.map(type => {
        let colorValues = (type.id !== 'hex') ? colors[type.id].map(i => Number(Number(i).toFixed(1))) : colors[type.id]; 

        return {
          ...type,
          value: colorValues,
          selected: (type.id == selectedType) ? true : false
        }
      });

      this.setState({ contrast: contrast.yiq, grandStop, hex: colors.hex, types });
      return;
    }

    const active = this.state.types.find(type => type.selected);
    const { colors, contrast, grandStop } = this._colorChangeCalculation(active.id, active.value, false);

    this.setState({ contrast: contrast.yiq, grandStop, hex: colors.hex });
  }

  _colorChangeCalculation (id, value, animated) {
    const colors = colorConvert(id, value);
    const contrast = yiqContrastRatio(colors.rgb);
    const grandStop = generateGrandStop(colors.hex);

    const textColor = (contrast.result === 'black') ? grandStop[7] : `#${colors.hex}`;
    const secondaryColor = (contrast.result === 'black') ? grandStop[1] : grandStop[7];

    const cssVariable = [
      ['primary-color', `#${colors.hex}`],
      ['secondary-color', secondaryColor],
      ['text-color', textColor]
    ]

    document.body.style.cssText = cssVariable.filter(css => (css[1] !== null)).map(css => {
      return `--${css[0]}: ${css[1]};`
    }).join('')

    document.body.style.cssText += (animated) ? `transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);` : ''
    
    if (contrast.result === 'black') document.body.classList.add('dark');
    else document.body.classList.remove('dark');

    return {
      colors,
      contrast,
      grandStop
    };
  }

  onTypeChanged = (id) => {
    const colorTypes = this.state.types.map(type => {
      return { ...type, selected: (type.id === id) ? true : false };
    });

    this.setState({ types: colorTypes });

    route(`/${id}/${this.state.hex.toLowerCase()}`)
  }

  onColorChanged = (id, value) => {
    const { colors, contrast, grandStop } = this._colorChangeCalculation(id, value, true);
    const active = this.state.types.find(type => type.selected);

    const changed = this.state.types.map(type => {
      let colorValues = (type.id === 'rgb') ? colors[type.id].map(i => Number(Number(i).toFixed(0))) : colors[type.id]; 

      return { ...type, value: colorValues };
    });

    this.setState({ types: changed, contrast: contrast.yiq, grandStop, hex: colors.hex });
    // event dispatch for setColorContrast
    this.props.setColorContrast(contrast.result)

    route(`/${active.id}/${colors.hex.toLowerCase()}`)
  }

  render (props, { types, contrast, grandStop, hex }) {
    const active = types.find(type => type.selected);
    const contrastResult = (contrast >= 128) ? 'black' : 'white';

    return <div id="content">
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
    </div>;
  }
}

export default connect('contrast', actions)(ColorConverter)