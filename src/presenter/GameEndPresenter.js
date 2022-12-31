import { useRecoilState } from "recoil";
import { gameLosersAtom, gameWinnersAtom } from "../model/Game";
import GameEndView from "../views/GameEndView";

function GameEndPresenter() {

    const [gameWinners, setGameWinners] = useRecoilState(gameWinnersAtom);
    const [gameLosers, setGameLosers] = useRecoilState(gameLosersAtom);


    return (<GameEndView
        winnerPlayers={gameWinners}
        loserPlayers={gameLosers}
    ></GameEndView>);
}

export default GameEndPresenter;