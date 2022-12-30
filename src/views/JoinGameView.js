function JoinGameView({ onGameIdChanged, onJoinGameClicked }) {
    return (<form>
        <div style={{fontSize: "40px"}}>Join Game</div>
        <div className="createGameInputHolder">
            <input id="joinInputId" placeholder="Game ID" type="number" min="0"  onChange={onGameIdChanged}></input>
        </div>
        <button id="joinButtonId" type="submit" onClick={onJoinGameClicked}>Join Game</button>
    </form>);
}

export default JoinGameView;