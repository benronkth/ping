function NewlyCreatedGamesView({ games, onGameIdClicked }) {

    function NewlyCreatedGamesView(game) {
        return <button key={"b" + game.id} onClick={(event) => { onGameIdClicked(event, game); }} style={{ width: "100%" }}>
            {game.id + " (🤹 " + game.playersCount + ")"}
        </button>;
    }

    function gameSorter(game1, game2) {
        return game1.creationDate > game2.creationDate
    }
    return (<form>
        <div key={"newlyCreatedGamesListKey2"} style={{ fontSize: "40px", margin:"5px" }}>Newly Created</div>
        <div key={"newlyCreatedGamesListKey"}>
            {[...games].sort(gameSorter).slice(0, 4).map(NewlyCreatedGamesView)}
        </div>
    </form>);
}

export default NewlyCreatedGamesView;