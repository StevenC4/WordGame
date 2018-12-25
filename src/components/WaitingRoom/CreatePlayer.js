import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import actionCreators from '../../actionCreators';

class CreatePlayer extends Component {
    defaultState = {
        playerNameInput: ''
    };

    static propTypes = {
        playerIds: PropTypes.arrayOf(
            PropTypes.string
        ).isRequired,
        playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
        setPlayerName: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {target} = e;
        const {value} = target;

        this.setState({
            playerNameInput: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.playerNameInput.trim() !== '') {
            this.props.setPlayerName(this.props.playerId, this.state.playerNameInput);
            this.setState({
                playerNameInput: ''
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Enter Your Name</h1>
                <form onSubmit={this.handleSubmit}>
                    <input name='playerNameInput' type='text' value={this.state.playerNameInput} onChange={this.handleChange}></input>
                    <button type='submit'>
                        <FontAwesomeIcon icon='check' />
                    </button>
                </form>
                <ul>
                    {this.props.playerIds.map((id) => <li key={id}>{this.props.playerNames[id]}</li>)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playerId: state.me.playerId,
        playerIds: state.waitingRoom.playerIds,
        playerNames: state.players.names
    };
};

const mapDispatchToProps = {
    setPlayerName: actionCreators.waitingRoom.setPlayerName
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer);
