import React, { Component } from 'react';
import './App.css';
import CreatePlayer from './CreatePlayer';
import ChooseTeam from './ChooseTeam';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import WordCollector from './WordCollector';

import uuid from 'uuid/v4';

library.add(faCheck);

const COLLECTING_WORDS = 'COLLECTING_WORDS';

class App extends Component {
  defaultState = {
    myPlayerId: '12345',
    game: {
      started: false,
      playerIds: [],
      state: COLLECTING_WORDS,
      wordIds: [],
      words: {},
      playerWords: {}
    },
    players: {
      playerNames: {
        '23456': 'Bob',
        '34567': 'Boris',
        '45678': 'Bill',
        '56789': 'Suzie',
        '67890': 'Sally',
        '78901': 'Samantha',
        '89012': 'Freddish'
      }
    },
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
      ready: false,
      readyCountdownSeconds: 5,
      teamIds: ['1', '2'],
      teamMembers: {
        '1': ['23456', '45678', '67890', '89012'],
        '2': ['34567', '56789', '78901'],
      }
    }
  };

  waitingRoomTimer;

  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.setPlayerName = this.setPlayerName.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.handleNotReady = this.handleNotReady.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.addWord = this.addWord.bind(this);
  }

  setPlayerName(name) {
    this.setState(prevState => ({
      ...prevState,
      players: {
        ...prevState.players,
        playerNames: {
          ...prevState.players.playerNames,
          [this.state.myPlayerId]: name
        }
      },
      waitingRoom: {
        ...prevState.waitingRoom,
        playerIds: [...prevState.waitingRoom.playerIds, this.state.myPlayerId],
      }
    }));
  }

  selectTeam(selectedTeamId) {
    // TODO: Validate team number 0 or 1
    this.setState(prevState => {
      let newState = {...prevState};
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

  handleReady() {
    this.setState(prevState => ({
      ...prevState,
      waitingRoom: {
        ...prevState.waitingRoom,
        ready: true,
        readyCountdownSeconds: this.defaultState.waitingRoom.readyCountdownSeconds
      }
    }));

    this.waitingRoomTimer = setInterval(this.decrementTimer, 1000);
  }

  decrementTimer() {
    this.setState(prevState => {
      let newState = {
        ...prevState,
        waitingRoom: {
          ...prevState.waitingRoom,
          readyCountdownSeconds: prevState.waitingRoom.readyCountdownSeconds - 1
        }
      };
      
      if (newState.waitingRoom.readyCountdownSeconds <= 0) {
        clearInterval(this.waitingRoomTimer);
        newState.game.started = true;
        newState.game.playerIds = prevState.waitingRoom.playerIds;
        newState.waitingRoom.playerIds = [];
      }

      return newState;
    });
  }

  handleNotReady() {
    this.setState(prevState => ({
      ...prevState,
      waitingRoom: {
        ...prevState.waitingRoom,
        ready: false,
        readyCountdownSeconds: this.defaultState.waitingRoom.readyCountdownSeconds
      }
    }));
  }

  addWord(word) {
    word = word.trim().toLowerCase();
    if (Object.entries(this.state.game.words).some(entry => entry[1] === word)) {
      return false;
    }

    const wordId = uuid();

    this.setState(prevState => {
      let newState = {
        ...prevState,
        game: {
          ...prevState.game,
          wordIds: [
            ...prevState.game.wordIds,
            wordId
          ],
          words: {
            ...prevState.game.words,
            [wordId]: word
          }
        }
      };

      const myPlayerId = this.state.myPlayerId;

      if (!prevState.game.playerWords.hasOwnProperty(myPlayerId)) {
        newState.game.playerWords[myPlayerId] = [wordId];
      } else {
        newState.game.playerWords[myPlayerId] = [...prevState.game.playerWords[myPlayerId], wordId];
      }

      return newState;
    });

    return true;
  }

  render() {
    const {myPlayerId} = this.state;
    const playerCreated = this.state.players.playerNames.hasOwnProperty(myPlayerId);
    const playerInWaitingRoom = this.state.waitingRoom.playerIds.includes(myPlayerId);
    const playerInGame = this.state.game.playerIds.includes(myPlayerId);
    const playerSubmittedWords = (this.state.game.playerWords.hasOwnProperty(myPlayerId) ? this.state.game.playerWords[myPlayerId].length : 0) === WordCollector.numberOfWords
    return (
      <div className="App">
        {!playerCreated &&
          <CreatePlayer
            playerIds={this.state.waitingRoom.playerIds}
            playerNames={this.state.players.playerNames}
            setPlayerName={this.setPlayerName}
          />
        }
        {playerInWaitingRoom &&
          <ChooseTeam
            handleNotReady={this.handleNotReady}
            handleReady={this.handleReady}
            myPlayerId={this.state.myPlayerId}
            playerNames={this.state.players.playerNames}
            ready={this.state.waitingRoom.ready}
            readyCountdownSeconds={this.state.waitingRoom.readyCountdownSeconds}
            selectTeam={this.selectTeam}
            teamIds={this.state.waitingRoom.teamIds}
            teamMembers={this.state.waitingRoom.teamMembers}
          />
        }
        {playerInGame && this.state.game.started && this.state.game.state === COLLECTING_WORDS && !playerSubmittedWords &&
          <WordCollector
            addWord={this.addWord}
            myPlayerId={this.state.myPlayerId}
            playerWords={this.state.game.playerWords}
            words={this.state.game.words}
          />
        }
        {playerInGame && this.state.game.started && this.state.game.state === COLLECTING_WORDS && playerSubmittedWords &&
          <div>Finished submitting words but waiting for everyone else</div>
        }
      </div>
    );
  }
}

export default App;
