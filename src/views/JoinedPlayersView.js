function JoinedPlayersView({ players, gameOwnerId }) {


    function showPlayerNames(player) {


        let image;
        let playerWeapon;
        if (player.weapon) {
            playerWeapon = Object.values(player.weapon)[0];
            image = process.env.PUBLIC_URL + "images/" + playerWeapon.image;
        }

        return <div key={player.id} className={"square " + (player.isAlive ? "" : "line-through")} style={{ backgroundColor: player.color }}>
            <div>{player.id === gameOwnerId ? "👑" : ""} {player.name}  </div>
            <div style={{ marginRight: "15px" }}>❤️ {(player.maxLivesCount - player.deathCount)}/{player.maxLivesCount} </div>

            {player.weapon ?
                <div className="artifact-flag animate__animated animate__bounce ">
                    <div className={"artifact-flag-content "} style={{
                        backgroundImage: "url(" + image + ")"
                    }}>
                    </div>
                    <div>{playerWeapon.name}</div>
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