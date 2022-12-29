function JoinGameView({ onGameIdChanged, onJoinGameClicked }) {
    return (<form>
        <div style={{fontSize: "40px"}}>Join Game</div>
        <div className="createGameInputHolder">
            <input placeholder="Game ID" onChange={onGameIdChanged}></input>
        </div>
        <button type="submit" onClick={onJoinGameClicked}>Join Game</button>
    </form>);
}

export default JoinGameView;