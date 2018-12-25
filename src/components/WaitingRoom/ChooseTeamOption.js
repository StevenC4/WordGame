import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import actionCreators from '../../actionCreators';

class ChooseTeamOption extends Component {
    static propTypes = {
        playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
        selected: PropTypes.bool.isRequired,
        selectTeam: PropTypes.func.isRequired,
        teamId: PropTypes.string.isRequired,
        teamMembers: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.props.selectTeam(this.props.playerId, this.props.teamId);
    }

    render() {
        return (
            <div className={classNames('chooseTeamOption', {selectedTeam: this.props.selected})} onClick={this.clickHandler}>
                <h1>Team {this.props.teamId}</h1>
                <h3>Members ({this.props.teamMembers.length})</h3>
                <ul>
                    {
                        this.props.teamMembers
                            .slice(0, 3)
                            .map(id => <li key={id}>
                                {this.props.playerNames[id]}
                            </li>)
                    }
                </ul>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    return {
        playerId: state.me.playerId,
        playerNames: state.players.names,
        teamMembers: state.waitingRoom.teamMembers[props.teamId]
    };
}

const mapDispatchToProps = {
    selectTeam: actionCreators.waitingRoom.setPlayerTeam
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTeamOption);
