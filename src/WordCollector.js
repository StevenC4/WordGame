import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class WordCollector extends Component {
    static propTypes = {
        addWord: PropTypes.func.isRequired
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
        if (this.state.inputValue.trim() === '') {
            return;
        }

        if (!this.props.addWord(this.state.inputValue)) {
            return;
        }

        this.setState({
            inputValue: ''
        });
    }

    render() {
        const myPlayerId = this.props.myPlayerId;
        const numPlayerWords = this.props.playerWords.hasOwnProperty(myPlayerId) ? this.props.playerWords[myPlayerId].length : 0;
        const remainingWords = WordCollector.numberOfWords - numPlayerWords;
        return (
            <div>
                <h1>Enter {remainingWords + (remainingWords !== WordCollector.numberOfWords ? ' more' : '')} nouns:</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.inputValue} onChange={this.handleChange}/>
                    <button type='submit'>
                        <FontAwesomeIcon icon='check' />
                    </button>
                </form>
            </div>
        );
    }
};

export default WordCollector;
