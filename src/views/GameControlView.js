function GameControlView({ gameId, onStartGameClicked, isGameStarted, onExitGameClicked }) {
    return (<div className="game-control animate__animated animate__zoomIn">
        <div>Game ID: </div>
        <button id="gameIdButton">{gameId}</button>
        {isGameStarted ?
            <button className="animate__animated animate__fadeIn" onClick={onExitGameClicked}>Exit game</button>
            : <button className="animate__animated animate__fadeIn animate__infinite animate__slow" onClick={onStartGameClicked}>Start game</button>}

    </div>);
}

export default GameControlView;