import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import WordCollector from './WordCollector';
import AwaitingActivePlayerConfirmation from './AwaitingActivePlayerConfirmation';
import TurnStartCountdown from './TurnStartCountdown';
import PlayerTurn from './PlayerTurn';

class Game extends Component {
	static propTypes = {
		awaitingActivePlayerConfirmation: PropTypes.bool.isRequired,
		collectingWords: PropTypes.bool.isRequired,
		explainingRules: PropTypes.bool.isRequired,
		playerTurnActive: PropTypes.bool.isRequired,
		turnStartCountdown: PropTypes.bool.isRequired
	};

	render() {
		return (
			<div>
				{this.props.collectingWords && <WordCollector/>}
				{this.props.explainingRules && <div>Rules</div>}
				{this.props.awaitingActivePlayerConfirmation && <AwaitingActivePlayerConfirmation/>}
				{this.props.turnStartCountdown && <TurnStartCountdown/>}
				{this.props.playerTurnActive && <PlayerTurn/>}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		awaitingActivePlayerConfirmation: state.game.state === 'AWAITING_ACTIVE_PLAYER_CONFIRMATION',
		collectingWords: state.game.state === 'COLLECTING_WORDS',
		explainingRules: state.game.state === 'EXPLAINING_RULES',
		playerTurnActive: state.game.state === 'PLAYER_TURN_ACTIVE',
		turnStartCountdown: state.game.state === 'PLAYER_TURN_COUNTDOWN'
	};
};

export default connect(mapStateToProps)(Game);
