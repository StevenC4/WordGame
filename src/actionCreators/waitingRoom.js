export function resetCountdownTimer() {
    return function(dispatch, _getState) {
        dispatch({
            type: 'RESET_WAITING_ROOM_COUNTDOWN_TIMER'
        })
    }
}

export function setPlayerName(playerId, playerName) {
    return function (dispatch, _getState) {
        dispatch({
            type: 'SET_PLAYER_NAME',
            playerId,
            playerName
        });
    }
}

export function setPlayerTeam(playerId, teamId) {
    return function (dispatch, getState) {
        const state = getState();
        const oldTeamId = state.teams.ids.find(teamId => state.waitingRoom.teamMembers[teamId].includes(playerId));
        dispatch({
            type: 'SET_PLAYER_TEAM_WAITING_ROOM',
            playerId,
            newTeamId: teamId,
            oldTeamId: oldTeamId
        });
    }
}

export function setReady(ready) {
    return function(dispatch, _getState) {
        dispatch({
            type: 'SET_WAITING_ROOM_READY',
            ready
        });
    }
}

export function tickCountdownTimer() {
    return function(dispatch, _getState) {
        dispatch({
            type: 'TICK_COUNTDOWN_TIMER'
        });
    }
}
