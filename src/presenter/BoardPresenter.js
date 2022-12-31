
import TankPresenter from "./TankPresenter";
import WallPresenter from "./WallPresenter";
import TargetPresenter from "./TargetPresenter";
import BulletPresenter from "./BulletPresenter";
import DistructedPresenter from "./DistructedPresenter";
import { blockSizeAtom, boardColumnsCountAtom, boardMarginLeftAtom, boardMarginTopAtom, boardRowsCountAtom, gameIdAtom, isGameFinishedAtom } from "../model/Game";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { Animation, pushBalls } from "../animations/animations";
import ArtifactPresenter from "./ArtifactPresenter";
import GameEndPresenter from "./GameEndPresenter";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";

function BoardPresenter() {

    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [boardMarginLeft, setBoardMarginLeft] = useRecoilState(boardMarginLeftAtom);
    const [boardMarginTop, setBoardMarginTop] = useRecoilState(boardMarginTopAtom);
    const [isGameFinished, setIsGameFinished] = useRecoilState(isGameFinishedAtom);
    // const [gameWinners, setGameWinners] = useRecoilState(gameWinnersAtom);
    // const [gameLosers, setGameLosers] = useRecoilState(gameLosersAtom);


    function handleScreenResize(event) {
        const width = event.target.innerWidth;
        const height = event.target.innerHeight - 120;

        const blockSize = Math.min(height / boardRowsCount, width / boardColumnsCount)
        const roundedBlockSize = Math.floor(blockSize);
        setBlockSize(roundedBlockSize);
        const boardWidthInPixels = roundedBlockSize * boardColumnsCount;
        const extraWidthSpaceInPixels = width - boardWidthInPixels;
        setBoardMarginLeft(extraWidthSpaceInPixels / 2);

        const boardHeightInPixels = roundedBlockSize * boardRowsCount;
        const extraHeightSpaceInPixels = height - boardHeightInPixels;
        setBoardMarginTop(extraHeightSpaceInPixels / 2);
    }

    useEffect(() => {
        window.addEventListener("resize", handleScreenResize);

        return () => {
            window.removeEventListener("resize", handleScreenResize)
        }

    }, [])




    return (
        <div>
            {isGameFinished ? <GameEndPresenter></GameEndPresenter> :
                <div className="board-holder" style={{
                    marginLeft: boardMarginLeft + "px",
                    marginTop: boardMarginTop + "px",
                }}>
                    <div id="board" className="board">
                        <WallPresenter></WallPresenter>
                        <TargetPresenter></TargetPresenter>
                        <TankPresenter></TankPresenter>
                        <BulletPresenter></BulletPresenter>
                        <ArtifactPresenter></ArtifactPresenter>
                        <DistructedPresenter></DistructedPresenter>
                    </div>
                </div>
            }

        </div>);
}

export default BoardPresenter;