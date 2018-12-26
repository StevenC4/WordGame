export function getActiveTeamAndPlayers(state) {
    const turnNumber = state.game.turnNumber;
    const numberOfTeams = state.teams.ids.length;
    const teamIndex = turnNumber % numberOfTeams;
    const teamId = state.teams.ids[teamIndex];
    const playersOnTeam = state.game.teamMembers[teamId];
    const numberOfPlayersOnTeam = playersOnTeam.length;
    const playerIndex = Math.floor(turnNumber / numberOfTeams) % numberOfPlayersOnTeam;
    const activePlayerId = playersOnTeam[playerIndex];
    return {
        activePlayerId,
        teamId,
        teamIndex,
        numberOfPlayersOnTeam,
        playerIndex,
        playersOnTeam
    }
}