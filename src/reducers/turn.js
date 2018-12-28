import PlayerTurn from '../components/Game/PlayerTurn';
import TurnStartCountdown from '../components/Game/TurnStartCountdown';

// const initialState = {
//     countdownSeconds: PlayerTurn.numberOfSeconds,
//     currentWordId: null,
//     number: 0,
//     skips: 0,
//     startCountdownSeconds: TurnStartCountdown.numberOfSeconds,
//     wordPool: [],
//     wordPoolUsed: []
// };

const initialState = {
    countdownSeconds: PlayerTurn.numberOfSeconds,
    currentWordId: '20',
    number: 0,
    skips: 3,
    startCountdownSeconds: TurnStartCountdown.numberOfSeconds,
    wordPool: [
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '21',
        '22',
        '28',
        '29',
        '30',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40'
    ],
    wordPoolUsed: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '23',
        '24',
        '25',
        '26',
        '27',
        '31',
        '32',
        '33',
        '34',
    ]
};

function turn(state = initialState, action) {
    switch(action.type) {
        case 'RESET_TURN_COUNTDOWN':
            return {
                ...state,
                countdownSeconds: initialState.countdownSeconds
            }
        case 'RESET_TURN_START_COUNTDOWN':
            return {
                ...state,
                startCountdownSeconds: initialState.startCountdownSeconds
            }
        case 'PLAYER_TURN_UPDATE_CURRENT_WORD_AND_POOL':
            return {
                ...state,
                currentWordId: action.currentWordId,
                wordPool: action.wordPool,
                wordPoolUsed: action.wordPoolUsed
            }
        case 'MARK_WORD_CORRECT':
            return {
                ...state,

            }
        case 'TURN_COUNTDOWN_TICK':
            return {
                ...state,
                countdownSeconds: action.countdownSeconds
            }
        case 'TURN_START_COUNTDOWN_TICK':
            return {
                ...state,
                startCountdownSeconds: action.startCountdownSeconds
            }
        case 'USE_SKIP':
            return {
                ...state,
                skips: action.skips
            }
        default:
            return state;
    }
};

export default turn;
