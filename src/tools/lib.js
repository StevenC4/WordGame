export function getActiveTeamAndPlayers(state) {
    const turnNumber = state.game.turnNumber;
    const numberOfTeams = state.teams.ids.length;
    const teamIndex = turnNumber % numberOfTeams;
    const activeTeamId = state.teams.ids[teamIndex];
    const playersOnTeam = state.game.teamMembers[activeTeamId];
    const numberOfPlayersOnTeam = playersOnTeam.length;
    const playerIndex = Math.floor(turnNumber / numberOfTeams) % numberOfPlayersOnTeam;
    const activePlayerId = playersOnTeam[playerIndex];
    return {
        activePlayerId,
        activeTeamId,
        teamIndex,
        numberOfPlayersOnTeam,
        playerIndex,
        playersOnTeam
    }
}