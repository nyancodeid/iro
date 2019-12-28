import { h } from 'preact';
import { connect } from 'unistore/preact'

const Header = ({ contrast }) => (<header>
	<div>
		<h1>IRO</h1>
		<span>Amazing color tools</span>
	</div>
	<img src={`/assets/icon-${contrast}.svg`} alt={`icon-${contrast}`} />
</header>);

export default connect('contrast')(Header);
