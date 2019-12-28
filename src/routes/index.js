import { h, Fragment } from 'preact'
import Router from 'preact-router'
import { createHashHistory } from 'history'

import Header from '../components/Header'
import ColorConvert from './ColorConverter'

export default () => (
  <div id="app">
    <Header />
    <Router history={createHashHistory()}>
      <ColorConvert path="/" />
      <ColorConvert path="/:type/:hex" />
    </Router>
  </div>
)