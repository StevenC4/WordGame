import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actionCreators from '../../actionCreators';
import {getActiveTeamAndPlayers} from '../../tools/lib';

class TurnStartCountdown extends Component {
    static numberOfSeconds = 5;

    static propTypes = {
        activePlayerId: PropTypes.string.isRequired,
        activePlayerName: PropTypes.string.isRequired,
        playerIsActive: PropTypes.bool.isRequired,
        turnStartCountdownSeconds: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.decrementTimer = this.decrementTimer.bind(this);
    }

    componentDidMount() {
        this.props.resetTurnStartCountdown();
        this.turnStartCountdown = setInterval(this.decrementTimer, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.turnStartCountdown);
    }

    decrementTimer() {
        this.props.turnStartCountdownTick();
        if (this.props.turnStartCountdownSeconds === 0) {
            clearInterval(this.turnStartCountdown);
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.playerIsActive ? 'Get ready:' : `Look at ${this.props.activePlayerName}`}</h1>
                <h3>{this.props.turnStartCountdownSeconds}</h3>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {activePlayerId} = getActiveTeamAndPlayers(state);
	return {
        activePlayerId: activePlayerId,
        activePlayerName: state.players.names[activePlayerId],
        playerIsActive: activePlayerId === state.me.playerId,
        turnStartCountdownSeconds: state.game.turnStartCountdownSeconds
    };
};

const mapDispatchToProps = {
    turnStartCountdownTick: actionCreators.game.turnStartCountdownTick,
    resetTurnStartCountdown: actionCreators.game.resetTurnStartCountdown
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnStartCountdown);
