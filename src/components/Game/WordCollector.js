import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import actionCreators from '../../actionCreators';

class WordCollector extends Component {
    static propTypes = {
        addWord: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
        numRemainingWords: PropTypes.number.isRequired,
        playerWordIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        words: PropTypes.objectOf(PropTypes.string).isRequired
    }

    defaultState = {
        inputValue: ''
    };

    static numberOfWords = 5;

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
            inputValue: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.addWord(this.state.inputValue);

        this.setState({
            inputValue: ''
        });
    }

    render() {
        return (
            <div>
                <h1>Enter {this.props.numRemainingWords + (this.props.numRemainingWords !== WordCollector.numberOfWords ? ' more' : '')} nouns:</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.inputValue} onChange={this.handleChange}/>
                    <button type='submit'>
                        <FontAwesomeIcon icon='check' />
                    </button>
                </form>
                <p>{this.props.errorMessage}</p>
                <ul>
                    {this.props.playerWordIds.map(wordId => <li key={wordId}>{this.props.words[wordId]}</li>)}
                </ul>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const playerId = state.me.playerId;
    const playerWordIds = state.game.playerWords[playerId];
    return {
        errorMessage: state.game.wordCollectorError,
        playerWordIds,
        words: state.game.words,
        numRemainingWords: WordCollector.numberOfWords - playerWordIds.length
    };
}

const mapDispatchToProps = {
    addWord: actionCreators.game.addWord
};

export default connect(mapStateToProps, mapDispatchToProps)(WordCollector);
