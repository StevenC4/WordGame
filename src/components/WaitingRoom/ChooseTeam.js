import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ChooseTeamOption from './ChooseTeamOption';

class ChooseTeam extends Component {
	static propTypes = {
		myTeam: PropTypes.string,
		teamIds: PropTypes.arrayOf(PropTypes.string).isRequired,
		teamMembers: PropTypes.object.isRequired
	};

	render() {
		return (
			<div>
				{
					this.props.teamIds.map(teamId => <ChooseTeamOption
						key={teamId}
						selected={this.props.myTeam === teamId}
						teamId={teamId}
						teamMembers={this.props.teamMembers[teamId]}
					/>)
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let myTeam = state.teams.ids.find(
		teamId => state.waitingRoom.teamMembers[teamId].some(
			playerId => playerId === state.me.playerId
		)
	);

	return {
		myTeam,
		teamIds: state.teams.ids,
		teamMembers: state.waitingRoom.teamMembers,
	};
};

export default connect(mapStateToProps)(ChooseTeam);
