
// const initialState = {
//     names: {
//         '23456': 'Bob',
//         '34567': 'Boris',
//         '45678': 'Bill',
//         '56789': 'Suzie',
//         '67890': 'Sally',
//         '78901': 'Samantha',
//         '89012': 'Freddish'
//     }
// };

// const initialState = {
//     names: {
//         '23456': 'Bob',
//         '34567': 'Boris',
//         '45678': 'Bill',
//         '56789': 'Suzie',
//         '67890': 'Sally',
//         '78901': 'Samantha',
//         '89012': 'Freddish'
//     }
// };

const initialState = {
    names: {
        '12345': 'Steven',
        '23456': 'Bob',
        '34567': 'Boris',
        '45678': 'Bill',
        '56789': 'Suzie',
        '67890': 'Sally',
        '78901': 'Samantha',
        '89012': 'Freddish'
    }
};

function players(state = initialState, action) {
    switch(action.type) {
        case 'SET_PLAYER_NAME':
            return {
                ...state,
                names: {
                    ...state.names,
                    [action.playerId]: action.playerName 
                }
            }
        default:
            return state;
    }
};

export default players;
