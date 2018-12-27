import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actionCreators from '../../../actionCreators';

class ActivePlayerTurn extends Component {
	static propTypes = {
        currentWord: PropTypes.string.isRequired,
		turnCountdownSeconds: PropTypes.number.isRequired
    };
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {target} = e;
        const {name} = target;
        if (name === 'skipWord') {
            this.props.skipWord();
        } else if (name === 'wordCorrect') {
            this.props.markWordCorrect();
            this.props.addPoint();
        }
    }

	render() {
        return (
            <div>
                <h1>You're up!</h1>
                <h2>{this.props.turnCountdownSeconds}</h2>
                <h2>{this.props.currentWord}</h2>
                <button name='skipWord' onClick={this.handleClick}>Skip</button>
                <button name='wordCorrect' onClick={this.handleClick}>Correct</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const currentWordId = state.turn.currentWordId;
    const currentWord = currentWordId ? state.game.words[currentWordId] : null;
	return {
        currentWord: currentWord,
        turnCountdownSeconds: state.turn.countdownSeconds
	};
};

const mapDispatchToProps = {
    addPoint: actionCreators.score.addPoint,
    markWordCorrect: actionCreators.turn.markWordCorrect,
    skipWord: actionCreators.turn.skipWord,
    turnCountdownTick: actionCreators.turn.countdownTick
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivePlayerTurn);
