
const initialState = {
    started: false,
    playerIds: [],
    state: 'COLLECTING_WORDS',
    wordIds: [],
    wordCollectorError: null,
    words: {},
    playerWords: {}
};

function game(state = initialState, action) {
    switch(action.type) {
        case 'ADD_WORD':
            return {
                ...state,
                wordIds: [...state.wordIds, action.wordId],
                words: {
                    ...state.words,
                    [action.wordId]: action.word
                },
                playerWords: {
                    ...state.playerWords,
                    [action.playerId]: [...state.playerWords[action.playerId], action.wordId]
                }
            };
        case 'MOVE_PLAYERS_FROM_WAITING_ROOM_TO_GAME':
            return {
                ...state,
                playerIds: [
                    ...action.playerIds
                ],
                playerWords: {
                    ...state.playerWords,
                    ...action.playerIds.reduce((playerWords, playerId) => ({...playerWords, [playerId]: []}), {})
                }
            };
        case 'SET_WORD_COLLECTOR_ERROR':
            return {
                ...state,
                wordCollectorError: action.errorMessage
            };
        case 'START_GAME':
            return {
                ...state,
                started: true
            }
        default:
            return state;
    }
};

export default game;
