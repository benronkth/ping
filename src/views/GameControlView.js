
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
        <button className="animate__animated animate__fadeIn" onClick={onExitGameClicked}>Exit game</button>
        <hr></hr>
        {!isGameFinished ?
            <div className="flex-column">
                <div className="flex-row">
                    <div className="line"></div>
                    <div style={{color: "white"}}> Game ID </div>
                    <div className="line"></div>
                </div>
                <button id="gameIdButton">{gameId}</button>
                {showGameStartButtons()}
            </div>
            : <div></div>}

    </div>);
}

export default GameControlView;