import { h, Component } from 'preact';

import { Provider } from 'unistore/preact'
import Store from './Store'
import Router from '../routes'

// store
const store = Store({ contrast: 'white' })

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}
