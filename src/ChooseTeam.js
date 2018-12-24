import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChooseTeamOption from './ChooseTeamOption';

class ChooseTeam extends Component {
    static propTypes = {
        handleReady: PropTypes.func.isRequired,
        handleNotReady: PropTypes.func.isRequired,
        myPlayerId: PropTypes.string.isRequired,
        playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
        ready: PropTypes.bool.isRequired,
        readyCountdownSeconds: PropTypes.number.isRequired,
        teamIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        teamMembers: PropTypes.object.isRequired,
    };

    render() {
        const onTeam = this.props.teamIds
            .find(teamId => this.props.teamMembers[teamId]
            .some(playerId => playerId === this.props.myPlayerId));
        return (
            <div>
                {
                    this.props.teamIds.map(teamId => <ChooseTeamOption
                        key={teamId}
                        playerNames={this.props.playerNames}
                        selected={onTeam === teamId}
                        selectTeam={this.props.selectTeam}
                        teamId={teamId}
                        teamMembers={this.props.teamMembers[teamId]}
                    />)
                }
                {!this.props.ready && onTeam !== undefined && <button onClick={this.props.handleReady}>Ready</button>}
                {this.props.ready && <button onClick={this.props.handleNotReady}>Cancel</button>}
                {this.props.ready && <p>{this.props.readyCountdownSeconds}</p>}
            </div>
        );
    }
}

export default ChooseTeam;
