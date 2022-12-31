
function GameControlView({ gameId, onStartGameClicked, isGameStarted, onExitGameClicked, onEndGameClicked, isGameFinished }) {


    function showGameStartButtons() {
        return <div>
            {isGameStarted ?
                <button className="animate__animated animate__fadeIn" onClick={onEndGameClicked}>End game</button>
                : <button className="animate__animated animate__fadeIn animate__infinite animate__slow" onClick={onStartGameClicked}>Start game</button>
            }
        </div>
    }


    return (<div className="game-control animate__animated animate__zoomIn">
        {!isGameFinished ?
            <div className="flex-row">
                <div>Game ID: </div>
                <button id="gameIdButton">{gameId}</button>
                {showGameStartButtons()}
            </div>
            : <div></div>}
        <button className="animate__animated animate__fadeIn" onClick={onExitGameClicked}>Exit game</button>

    </div>);
}

export default GameControlView;