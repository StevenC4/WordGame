import React, {Component} from 'react';
import {connect} from 'react-redux';

class JoinButton extends Component {
	constructor(props) {
		super(props);
		this.handleJoin = this.handleJoin.bind(this);
	}

    handleJoin() {
		this.props.setReady(true);
		this.props.resetCountdownTimer();
		this.waitingRoomTimer = setInterval(this.decrementTimer, 1000);
	}

    render() {
		// TODO: Implement functionality to join game - should add player to team in game
        return (
            <div>
                {!this.props.ready && <button onClick={this.handleJoin}>Join</button>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JoinButton);
