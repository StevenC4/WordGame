import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CreatePlayer from './CreatePlayer';
import ChooseTeam from './ChooseTeam';
import JoinButton from './JoinButton';
import ReadyButton from './ReadyButton';

class WaitingRoom extends Component {
    static propTypes = {
        playerCreated: PropTypes.bool.isRequired,
        showJoinButton: PropTypes.bool.isRequired,
        showReadyButton: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div>
                {!this.props.playerCreated
                    ?
                    <CreatePlayer/>
                    :
                    <ChooseTeam/>
                }
                {this.props.showReadyButton && <ReadyButton/>}
                {this.props.showJoinButton && <JoinButton/>}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    let myTeam = state.teams.ids.find(
		teamId => state.waitingRoom.teamMembers[teamId].some(
			playerId => playerId === state.me.playerId
		)
    );

    return {
        playerCreated: state.waitingRoom.playerIds.includes(state.me.playerId),
        showJoinButton: myTeam !== undefined && state.game.started,
        showReadyButton: myTeam !== undefined && !state.game.started
    };
};

export default connect(mapStateToProps)(WaitingRoom);
