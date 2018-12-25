import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import WordForm from './WordForm';
import WaitingScreen from './WaitingScreen';

class WordCollector extends Component {
    static propTypes = {
        collectingWords: PropTypes.bool.isRequired
    };

    static numberOfWords = 5;

    render() {
        return (
            <div>
                {
                    this.props.collectingWords
                        ?
                            <WordForm/>
                        :
                            <WaitingScreen/>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const playerId = state.me.playerId;
    const playerWordIds = state.game.playerWords[playerId];
    return {
        collectingWords: playerWordIds.length < WordCollector.numberOfWords
    };
}

export default connect(mapStateToProps)(WordCollector);
