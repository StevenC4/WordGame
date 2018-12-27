// const initialState = {
    // playerPoints: {},
    // teamPoints: {}
// };

const initialState = {
    playerPoints: {
        '12345': 0,
    },
    teamPoints: {
        '1': 0,
        '2': 0,
    }
};

function score(state = initialState, action) {
    switch(action.type) {
        case 'ADD_POINT':
            return {
                ...state,
                playerPoints: action.playerPoints,
                teamPoints: action.teamPoints
            }
        default:
            return state;
    }
};

export default score;
