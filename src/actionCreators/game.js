import uuidv4 from 'uuid/v4';

export function addWord(word) {
    return function(dispatch, getState) {
        const state = getState();

        word = word.trim();
        const wordAlreadyExists = state.game.wordIds.some(wordId => state.game.words[wordId].toLowerCase() === word);

        if (word === '') {
            dispatch({
                type: 'SET_WORD_COLLECTOR_ERROR',
                errorMessage: 'You cannot subit an empty word.'
            });
        } else if (wordAlreadyExists) {
            dispatch({
                type: 'SET_WORD_COLLECTOR_ERROR',
                errorMessage: 'That word has already been sumitted. Please choose a different word.'
            });
        } else {
            const wordId = uuidv4();
            dispatch({
                type: 'SET_WORD_COLLECTOR_ERROR',
                errorMessage: null
            });
            dispatch({
                type: 'ADD_WORD',
                word,
                wordId,
                playerId: state.me.playerId
            });
        }
    }
}

export function startGame() {
    return function(dispatch, _getState) {
        dispatch({
            type: 'START_GAME'
        });
    }
}

export function movePlayersFromWaitingRoomToGame() {
    return function(dispatch, getState) {
        const state = getState();
        dispatch({
            type: 'MOVE_PLAYERS_FROM_WAITING_ROOM_TO_GAME',
            playerIds: [...state.waitingRoom.playerIds]
        });
    }
}
