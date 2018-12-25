import ReadyButton from "../components/WaitingRoom/ReadyButton";

const initialState = {
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
    readyCountdownSeconds: ReadyButton.defaultTimerSeconds,
    teamIds: ['1', '2'],
    teamMembers: {
        '1': ['23456', '45678', '67890', '89012'],
        '2': ['34567', '56789', '78901'],
    }
};

function waitingRoom(state = initialState, action) {
    switch(action.type) {
        case 'MOVE_PLAYERS_FROM_WAITING_ROOM_TO_GAME':
            return {
                ...state,
                playerIds: [],
                teamMembers: state.teamIds.reduce((teamMembers, teamId) => ({...teamMembers, [teamId]: []}), {})
            };
        case 'RESET_WAITING_ROOM_COUNTDOWN_TIMER':
            return {
                ...state,
                readyCountdownSeconds: ReadyButton.defaultTimerSeconds
            }
        case 'SET_PLAYER_NAME':
            return {
                ...state,
                playerIds: [
                    ...state.playerIds,
                    action.playerId
                ]
            }
        case 'SET_PLAYER_TEAM_WAITING_ROOM':
            const newState = {
                ...state,
            };

            if (action.oldTeamId !== action.newTeamId) {
                if (action.oldTeamId !== undefined) {
                    newState.teamMembers[action.oldTeamId] = newState.teamMembers[action.oldTeamId].filter(playerId => playerId !== action.playerId);
                }

                newState.teamMembers[action.newTeamId] = [
                    ...newState.teamMembers[action.newTeamId],
                    action.playerId
                ];
            }

            return newState;
        case 'SET_WAITING_ROOM_READY':
            return {
                ...state,
                ready: action.ready
            }
        case 'TICK_COUNTDOWN_TIMER':
            return {
                ...state,
                readyCountdownSeconds: state.readyCountdownSeconds - 1
            }
        default:
            return state;
    }
};

export default waitingRoom;
