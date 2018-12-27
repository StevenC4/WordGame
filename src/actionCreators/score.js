import {getActiveTeamAndPlayers} from '../tools/lib';

export function addPoint() {
    return function(dispatch, getState) {
        const state = getState();
        const playerPoints = {...state.score.playerPoints};
        const teamPoints = {...state.score.teamPoints};

        const {activePlayerId, activeTeamId} = getActiveTeamAndPlayers(state);
        playerPoints[activePlayerId]++;
        teamPoints[activeTeamId]++;

        dispatch({
            type: 'ADD_POINT',
            playerPoints,
            teamPoints
        });
    };
}
