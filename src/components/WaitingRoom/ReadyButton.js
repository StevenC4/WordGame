import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actionCreators from '../../actionCreators';

class ReadyButton extends Component {
    static propTypes = {
        ready: PropTypes.bool.isRequired,
        readyCountdownSeconds: PropTypes.number.isRequired,
        resetCountdownTimer: PropTypes.func.isRequired,
		setReady: PropTypes.func.isRequired,
		startGame: PropTypes.func.isRequired,
        tickCountdownTimer: PropTypes.func.isRequired
    };

    static defaultTimerSeconds = 5;

	constructor(props) {
		super(props);
		this.decrementTimer = this.decrementTimer.bind(this);
		this.handleReady = this.handleReady.bind(this);
		this.handleNotReady = this.handleNotReady.bind(this);
		this.startGame = this.startGame.bind(this);
	}

    handleReady() {
		this.props.setReady(true);
		this.props.resetCountdownTimer();
		this.waitingRoomTimer = setInterval(this.decrementTimer, 1000);
	}

    handleNotReady() {
		this.props.setReady(false);
		this.props.resetCountdownTimer();
	}

	decrementTimer() {
		if (this.props.readyCountdownSeconds === 0) {
			clearInterval(this.waitingRoomTimer);
			this.startGame();
		} else {
			this.props.tickCountdownTimer();
		}
	}

	startGame() {
		this.props.movePlayersFromWaitingRoomToGame();
		this.props.startGame();
	}

    render() {
        return (
            <div>
                {!this.props.ready && <button onClick={this.handleReady}>Ready</button>}
                {this.props.ready && <button onClick={this.handleNotReady}>Cancel</button>}
				{this.props.ready && <p>{this.props.readyCountdownSeconds}</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ready: state.waitingRoom.ready,
        readyCountdownSeconds: state.waitingRoom.readyCountdownSeconds,
    };
};

const mapDispatchToProps = {
	movePlayersFromWaitingRoomToGame: actionCreators.game.movePlayersFromWaitingRoomToGame,
	resetCountdownTimer: actionCreators.waitingRoom.resetCountdownTimer,
	startGame: actionCreators.game.startGame,
	setReady: actionCreators.waitingRoom.setReady,
	tickCountdownTimer: actionCreators.waitingRoom.tickCountdownTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyButton);
