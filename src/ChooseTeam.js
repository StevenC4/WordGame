import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChooseTeamOption from './ChooseTeamOption';

class ChooseTeam extends Component {
    static propTypes = {
        teamIds: PropTypes.arrayOf(PropTypes.number).isRequired,
        teamMembers: PropTypes.object.isRequired,
        playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
        myPlayerId: PropTypes.string.isRequired
    };

    render() {
        const onTeam = Object.keys(this.props.teamIds)
            .find(teamId => this.props.teamMembers[teamId]
            .some(playerId => playerId === this.props.myPlayerId));
        const onTeamNumber = parseInt(onTeam);
        return (
            <div>
                {
                    this.props.teamIds.map(teamId => <ChooseTeamOption
                        key={teamId}
                        playerNames={this.props.playerNames}
                        selected={onTeamNumber === teamId}
                        selectTeam={this.props.selectTeam}
                        teamId={teamId}
                        teamMembers={this.props.teamMembers[teamId]}
                    />)
                }
            </div>
        );
    }
}

export default ChooseTeam;
