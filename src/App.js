import React, { Component } from 'react';
import './App.css';
import CreatePlayer from './CreatePlayer';
import ChooseTeam from './ChooseTeam';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck);

class App extends Component {
  defaultState = {
    myPlayerId: '12345',
    waitingRoom: {
      playerIds: [
        '23456',
        '34567',
        '45678',
        '56789',
        '67890',
        '78901',
        '89012'
      ],
      playerNames: {
        '23456': 'Bob',
        '34567': 'Boris',
        '45678': 'Bill',
        '56789': 'Suzie',
        '67890': 'Sally',
        '78901': 'Samantha',
        '89012': 'Freddish'
      },
      teamIds: [0, 1],
      teamMembers: {
        0: ['23456', '45678', '67890', '89012'],
        1: ['34567', '56789', '78901'],
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.setPlayerName = this.setPlayerName.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
  }

  setPlayerName(name) {
    this.setState(prevState => ({
      waitingRoom: {
        ...prevState.waitingRoom,
        playerIds: [...prevState.waitingRoom.playerIds, this.state.myPlayerId],
        playerNames: {
          ...prevState.waitingRoom.playerNames,
          [this.state.myPlayerId]: name
        }
      }
    }));
  }

  selectTeam(selectedTeamId) {
    // TODO: Validate team number 0 or 1
    this.setState(prevState => {
      let newState = {
        waitingRoom: {
          ...prevState.waitingRoom
        }
      };
      prevState.waitingRoom.teamIds.forEach(teamId => {
        const memberIds = prevState.waitingRoom.teamMembers[teamId];
        const isSelectedTeam = teamId === selectedTeamId;
        const onCurrentTeam = memberIds.includes(prevState.myPlayerId);
        if (!isSelectedTeam && onCurrentTeam) {
          newState.waitingRoom.teamMembers[teamId] = [...memberIds.filter(memberId => memberId !== prevState.myPlayerId)];
        } else if (isSelectedTeam && !onCurrentTeam) {
          newState.waitingRoom.teamMembers[teamId] = [...memberIds, prevState.myPlayerId];
        }
      });
      return newState;
    });
  }

  render() {
    const playerCreated = this.state.waitingRoom.playerIds.some(id => id === this.state.myPlayerId);
    return (
      <div className="App">
        {!playerCreated &&
          <CreatePlayer
            playerIds={this.state.waitingRoom.playerIds}
            playerNames={this.state.waitingRoom.playerNames}
            setPlayerName={this.setPlayerName}
          />
        }
        {playerCreated &&
          <ChooseTeam
            teamIds={this.state.waitingRoom.teamIds}
            teamMembers={this.state.waitingRoom.teamMembers}
            playerNames={this.state.waitingRoom.playerNames}
            myPlayerId={this.state.myPlayerId}
            selectTeam={this.selectTeam}
          />
        }
      </div>
    );
  }
}

export default App;
