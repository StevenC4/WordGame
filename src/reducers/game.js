import TurnStartCountdown from "../components/Game/TurnStartCountdown";
import PlayerTurn from "../components/Game/PlayerTurn";

// const initialState = {
//     started: false,
//     playerIds: [],
//     teamMembers: {
//         '1': ['23456', '45678', '67890', '89012'],
//         '2': ['34567', '56789', '78901']
//     }
//     turnNumber: 0,
//     turnStartCountdown: TurnStartCountdown.numberOfSeconds,
//     round: 1,
//     state: 'COLLECTING_WORDS',
//     wordIds: [],
//     wordCollectorError: null,
//     words: {},
//     playerWords: {}
// };

const initialState = {
    playerIds: [
        '12345',
        '23456',
        '34567',
        '45678',
        '56789',
        '67890',
        '78901',
        '89012',
    ],
    teamMembers: {
        '1': ['12345', '23456', '45678', '67890'],
        '2': ['34567', '56789', '78901', '89012']
    },
    turnNumber: 0,
    turnCountdownSeconds: PlayerTurn.numberOfSeconds,
    turnStartCountdownSeconds: TurnStartCountdown.numberOfSeconds,
    round: 1,
    started: true,
    state: 'PLAYER_TURN_ACTIVE',
    wordIds: [
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
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40'
    ],
    wordCollectorError: null,
    words: {
        '1': 'Steven',
        '2': 'Carroll',
        '3': 'Clark',
        '4': 'Natasha',
        '5': 'Berlim',
        '6': 'Banff',
        '7': 'Yosemite',
        '8': 'George Washington',
        '9': 'Yosemite Sam',
        '10': 'Bugs Bunny',
        '11': 'Porky the Pig',
        '12': 'Bouqueny',
        '13': 'Forest ranger',
        '14': 'Fang',
        '15': 'Marble',
        '16': 'Rye bread',
        '17': 'Squirrel',
        '18': 'Shanghai',
        '19': 'Vietnam',
        '20': 'Smelly Cheese',
        '21': 'Alaskan Malamute',
        '22': 'Piano Forte',
        '23': 'Shirt',
        '24': 'Tie rack',
        '25': 'Missionary',
        '26': 'Benny and the Jets',
        '27': 'Jenny and the Bets',
        '28': 'Elton John',
        '29': 'Sir Lancelot',
        '30': 'Fountain pen',
        '31': 'Pen fountain',
        '32': 'Fluffy Poodle',
        '33': 'Droopy the Dog',
        '34': 'Perfect 10',
        '35': 'Gymnast',
        '36': 'Cottage cheese',
        '37': 'Feril cats',
        '38': 'Thundercats',
        '39': 'Saxophone',
        '40': 'Benny Hill'
    },
    playerWords: {
        '12345': ['1', '2', '3', '4', '5'],
        '23456': ['6', '7', '8', '9', '10'],
        '34567': ['11', '12', '13', '14', '15'],
        '45678': ['16', '17', '18', '19', '20'],
        '56789': ['21', '22', '23', '24', '25'],
        '67890': ['26', '27', '28', '29', '39'],
        '78901': ['31', '32', '33', '34', '35'],
        '89012': ['36', '37', '38', '39', '40']
    }
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
                },
                teamMembers: {
                    ...state.teamMembers,
                    ...action.teamIds.reduce((teamMembers, teamId) => ({...teamMembers, [teamId]: [...action.teamMembers[teamId]]}))
                }
            };
        case 'RESET_TURN_START_COUNTDOWN':
            return {
                ...state,
                turnStartCountdownSeconds: TurnStartCountdown.numberOfSeconds
            }
        case 'SET_PLAYER_TURN_COUNTDOWN':
            return {
                ...state,
                state: 'PLAYER_TURN_COUNTDOWN'
            };
        case 'SET_PLAYER_TURN_ACTIVE':
            return {
                ...state,
                state: 'PLAYER_TURN_ACTIVE'
            }
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
        case 'TURN_COUNTDOWN_TICK':
            return {
                ...state,
                turnCountdownSeconds: action.turnCountdownSeconds
            }
        case 'TURN_START_COUNTDOWN_TICK':
            return {
                ...state,
                turnStartCountdownSeconds: action.turnStartCountdownSeconds
            }
        default:
            return state;
    }
};

export default game;
