import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PlayerConfirmationScreen from './PlayerConfirmationScreen';

class AwaitingActivePlayerConfirmation extends Component {
    static propTypes = {
        activePlayerId: PropTypes.string.isRequired,
        playerIsActive: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div>
                {
                    this.props.playerIsActive
                        ?
                            <PlayerConfirmationScreen/>
                        :
                            <div>Waiting for {this.props.activePlayerId}</div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        activePlayerId: state.game.activePlayerId,
        playerIsActive: state.game.activePlayerId === state.me.playerId
	};
};

export default connect(mapStateToProps)(AwaitingActivePlayerConfirmation);

