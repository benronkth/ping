 

function GameEndView({ winnerPlayers, loserPlayers }) {


    function generateConfetti() {

        if (winnerPlayers && winnerPlayers.length > 0) {
            let shootAudio = process.env.PUBLIC_URL + "sounds/applause.wav";
            var shootAudioPlayer = new Audio(shootAudio);
            shootAudioPlayer.volume = 0.1;
            // shootAudioPlayer.play();
            return (<div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
            </div>);
        } else {
            return (<div></div>);
        }

    }

    function drawWinners(player) {
        return <div className="square" key={player.id}><div className="animate__animated animate__infinite animate__wobble">🏆</div> {player.name}</div>
    }
    function drawLosers(player) {

        return <h6 key={player.id}>😭 {player.name}</h6>
    }


    return (<div className="winners-view animate__animated animate__zoomIn">
        <div className="circle animate__animated animate__flash animate__infinite animate__slower" style={{
            transform: "scale(3)",
            backgroundColor: "aqua"
        }}></div>
        <div className="circle rotate animate__animated animate__zoomIn animate__infinite animate__slow" style={{
            transform: "scale(3)",
            backgroundColor: "yellow"
        }}></div>
        <div className="circle animate__animated animate__tada animate__infinite animate__slower" style={{
            transform: "scale(2)",
            backgroundColor: "blue"
        }}></div>
        <div className="circle animate__animated animate__zoomIn animate__infinite"></div>
        <div className="confetti">
            {generateConfetti()}
            <div>
                <div> <h1>🎉 WINNERS 🎉</h1></div>
                {winnerPlayers.length > 0 ? winnerPlayers.map(drawWinners) : <div>Winners left the game.</div>}
                <hr></hr>
                {loserPlayers.length > 0 ? <div style={{ marginBottom: "-10px" }}> <h5>LOSERS</h5></div> : <div></div>}
                {loserPlayers.map(drawLosers)}
            </div>
        </div>
    </div>);
}

export default GameEndView;