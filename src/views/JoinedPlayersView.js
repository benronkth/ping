function JoinedPlayersView({ players, gameOwnerId }) {


    function showPlayerNames(player) {
        return <div key={player.id} className={"square " + (player.isAlive ? "" : "line-through")} style={{ backgroundColor: player.color }}>
            <div>{player.id === gameOwnerId ? "👑" : ""} {player.name}  </div>
            <div style={{marginRight: "15px"}}>❤️ {(player.maxLivesCount - player.deathCount)}/{player.maxLivesCount} </div>

            {player.weapon ?
                <div className="artifact-flag animate__animated animate__bounce ">
                    <div className={"artifact-flag-content " + Object.values(player.weapon)[0].image}> 
                    </div>
                    <div>{Object.values(player.weapon)[0].name}</div>
                </div>
                : <div></div>}
        </div>
    }
    return (<div className="joined-players-holder">
        <div style={{ padding: "5px" }}>Joined: </div>
        {players.map(showPlayerNames)}
    </div>);
}

export default JoinedPlayersView;