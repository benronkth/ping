function JoinedPlayersView({ players, gameOwnerId }) {
    function showPlayerNames(player) {
        return <div key={player.id} className={"square " + (player.isAlive ? "" : "line-through")} style={{ backgroundColor: player.color }}> {player.id === gameOwnerId ? "👑" : ""}  {player.name}  ❤️ {(player.maxLivesCount - player.deathCount)}/{player.maxLivesCount}</div>
    }
    return (<div className="joined-players-holder">
        <div style={{ padding: "5px" }}>Joined: </div>
        {players.map(showPlayerNames)}
    </div>);
}

export default JoinedPlayersView;