import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actionCreators from '../../../actionCreators';

class PlayerConfirmationScreen
 extends Component {
    static propTypes = {
        startTurnStartCountdown: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.startTurnStartCountdown();
    }

    render() {
        return (
            <div>
                <h1>Click "Ready" to start!</h1>
                <button onClick={this.handleClick}>Ready</button>
            </div>
        );
    }
}

const mapStateToProps = _state => {
	return {};
};

const mapDispatchToProps = {
    startTurnStartCountdown: actionCreators.game.startTurnStartCountdown
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerConfirmationScreen);
