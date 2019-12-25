import { h } from 'preact';
import { connect } from 'unistore/preact'

import IconBlack from '../assets/icon-black.svg'
import IconWhite from '../assets/icon-white.svg'

const Header = connect('contrast')(
	({ contrast }) => (
		<header>
			<div>
				<h1>IRO</h1>
				<span>Amazing color tools</span>
			</div>
			<img src={(contrast === "black") ? IconBlack : IconWhite } />
		</header>
	)
);

export default Header;
