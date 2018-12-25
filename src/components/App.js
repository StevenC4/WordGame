import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

import Game from './Game';
import WaitingRoom from './WaitingRoom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck);

class App extends Component {
	static propTypes = {
		playerInGame: PropTypes.bool.isRequired,
	};

	render() {
		return (
			<div className="App">
				{!this.props.playerInGame && <WaitingRoom/>}
				{this.props.playerInGame && <Game/>}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		playerInGame: state.game.playerIds.includes(state.me.playerId)
	};
}

export default connect(mapStateToProps)(App);
