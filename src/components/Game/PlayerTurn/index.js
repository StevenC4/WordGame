import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getActiveTeamAndPlayers} from '../../../tools/lib';
import actionCreators from '../../../actionCreators';
import ActivePlayerTurn from './ActivePlayerTurn';

class PlayerTurn extends Component {
	static propTypes = {
		playerIsActive: PropTypes.bool.isRequired
	};

    static numberOfSeconds = 60;

    constructor(props) {
        super(props);
        this.decrementTimer = this.decrementTimer.bind(this);
    }

    componentDidMount() {
        this.countdownTimer = setInterval(this.decrementTimer, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.countdownTimer);
    }

    decrementTimer() {
        if (this.props.turnCountdownSeconds > 0) {
            this.props.turnCountdownTick();
        } else {
            clearInterval(this.countdownTimer);
        }
    }

	render() {
        return (
            <div>
                {this.props.playerIsActive && <ActivePlayerTurn/>}
                {!this.props.playerIsActive && <div>You are not the active player</div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {activePlayerId, activeTeamId} = getActiveTeamAndPlayers(state);
    const myTeam = state.teams.ids.find(teamId => state.game.teamMembers[teamId].includes(state.me.playerId));
    const playerIsActive = activePlayerId === state.me.playerId;
    const teamIsActive = activeTeamId === myTeam;
	return {
        activePlayerName: state.players.names[activePlayerId],
        playerIsActive,
        playerIsGuessing: !playerIsActive && teamIsActive,
        playerIsOnInactiveTeam: !teamIsActive,
        turnCountdownSeconds: state.game.turnCountdownSeconds
	};
};

const mapDispatchToProps = {
    turnCountdownTick: actionCreators.turn.countdownTick
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTurn);
