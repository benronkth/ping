import { useRecoilState } from "recoil";
import { blockSizeAtom, boardColumnsCountAtom, boardMarginLeftAtom, boardMarginTopAtom, boardRowsCountAtom, gameLosersAtom, gameWinnersAtom } from "../model/Game";
import GameEndView from "../views/GameEndView";

function GameEndPresenter() {

    const [gameWinners, setGameWinners] = useRecoilState(gameWinnersAtom);
    const [gameLosers, setGameLosers] = useRecoilState(gameLosersAtom);

    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [boardMarginLeft, setBoardMarginLeft] = useRecoilState(boardMarginLeftAtom);
    const [boardMarginTop, setBoardMarginTop] = useRecoilState(boardMarginTopAtom);



    return (<GameEndView
        width={boardColumnsCount * blockSize}
        height={boardRowsCount * blockSize}
        winnerPlayers={gameWinners}
        loserPlayers={gameLosers}
    ></GameEndView>);
}

export default GameEndPresenter;