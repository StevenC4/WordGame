import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import WordCollector from './WordCollector';

class Game extends Component {
	static propTypes = {
		collectingWords: PropTypes.bool.isRequired
	};

	render() {
		return (
			<div>
				{this.props.collectingWords && <WordCollector/>}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		collectingWords: state.game.state === 'COLLECTING_WORDS'
	};
};

export default connect(mapStateToProps)(Game);
