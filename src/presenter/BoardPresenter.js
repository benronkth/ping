
import TankPresenter from "./TankPresenter";
import WallPresenter from "./WallPresenter";
import TargetPresenter from "./TargetPresenter";
import BulletPresenter from "./BulletPresenter";
import DistructedPresenter from "./DistructedPresenter";
import { blockSizeAtom, boardColumnsCountAtom, boardMarginLeftAtom, boardMarginTopAtom, boardRowsCountAtom, gameIdAtom } from "../model/Game";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { Animation, pushBalls } from "../animations/animations";

function BoardPresenter() {

    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [boardMarginLeft, setBoardMarginLeft] = useRecoilState(boardMarginLeftAtom);
    const [boardMarginTop, setBoardMarginTop] = useRecoilState(boardMarginTopAtom);


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
        <div className="board-holder" style={{
            marginLeft: boardMarginLeft + "px",
            marginTop: boardMarginTop + "px",
        }}>
 
            <div id="board" className="board">
                <WallPresenter></WallPresenter>
                <TargetPresenter></TargetPresenter>
                <TankPresenter></TankPresenter>
                <BulletPresenter></BulletPresenter>
                <DistructedPresenter></DistructedPresenter>
            </div>
        </div>);
}

export default BoardPresenter;