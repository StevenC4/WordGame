import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import WordCollector from './index';

class WaitingScreen extends Component {
    static propTypes = {
        playersLeft: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                numWordsLeft: PropTypes.number.isRequired
            })
        ).isRequired
    };

    render() {
        return (
            <div>
                <h1>Waiting on:</h1>
                <ul>
                    {this.props.playersLeft.map(player => 
                        <li key={player.id}>{player.name} ({player.numWordsLeft})</li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const playersLeft = state.game.playerIds
        .map(playerId => ({
            id: playerId,
            name: state.players.names[playerId],
            numWordsLeft: WordCollector.numberOfWords - state.game.playerWords[playerId].length
        }))
        .filter(player => player.numWordsLeft > 0);
    return {
        playersLeft
    };
}

export default connect(mapStateToProps)(WaitingScreen);
