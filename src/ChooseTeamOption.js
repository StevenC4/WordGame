import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ChooseTeamOption extends Component {
    static propTypes = {
        playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
        selected: PropTypes.bool.isRequired,
        selectTeam: PropTypes.func.isRequired,
        teamId: PropTypes.number.isRequired,
        teamMembers: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.props.selectTeam(this.props.teamId);
    }

    render() {
        return (
            <div className={classNames('chooseTeamOption', {selectedTeam: this.props.selected})} onClick={this.clickHandler}>
                <h1>Team {this.props.teamId + 1}</h1>
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

export default ChooseTeamOption;
