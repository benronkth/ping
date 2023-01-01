import WeaponsIconsPresenter from "../presenter/WeaponsIconPresenter";

function JoinedPlayersView({ players, gameOwnerId }) {


    function showPlayerNames(player) {



        return <div key={player.id} className={"square " + (player.isAlive ? "" : "line-through")} style={{ backgroundColor: player.color }}>
            <div>
                <div>{player.id === gameOwnerId ? "👑" : ""} {player.name} ❤️ {(player.maxLivesCount - player.deathCount)}/{player.maxLivesCount} </div>
            </div>
            <WeaponsIconsPresenter player={player}></WeaponsIconsPresenter>
        </div>
    }
    return (<div className="joined-players-holder">
        <div className="flex-row">
            <div className="line"></div>
            <div style={{ color: "white" }}>Joined </div>
            <div className="line"></div>
        </div>
        {players.map(showPlayerNames)}
    </div>);
}

export default JoinedPlayersView;