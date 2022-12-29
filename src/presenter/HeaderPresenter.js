import { useRecoilState } from "recoil";
import HeaderView from "../views/HeaderView";
import { blockSizeAtom, boardColumnsCountAtom, boardRowsCountAtom, bulletsAtom, createGame, gameIdAtom, opponentTanksAtom, tanksAtom, targetsAtom, wallsAtom, distructedsAtom } from "../model/Game";
import { useEffect } from "react";
import { db, removeBullet, removeWall, uploadBullet, uploadGame, uploadTank, uploadTarget, uploadWall } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { isPlayerLoggedInAtom, playerIdAtom } from "../model/User";

function HeaderPresenter() {
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [tanks, setTanks] = useRecoilState(tanksAtom);
    const [opponentTanks, setOpponentTanks] = useRecoilState(opponentTanksAtom);
    const [distructeds, setDistructeds] = useRecoilState(distructedsAtom);
    const [isPlayerLoggedIn, setIsPlayerLoggedIn] = useRecoilState(isPlayerLoggedInAtom);





    // useEffect(() => {

    //     console.log("creating the game!");
    //     const map = maps.map1;
    //     const game = createGame(map);
    //     let tempWalls = [];
    //     let tempTanks = [];
    //     let tempTargets = [];
    //     let tempBullets = [];

    //     for (let i = 0; i < game.board.length; i++) {
    //         const element = game.board[i];
    //         switch (element.type) {
    //             case elementTypes.wall:
    //                 tempWalls.push(element);
    //                 break;
    //             case elementTypes.target:
    //                 tempTargets.push(element);
    //                 break;
    //             case elementTypes.bullet:
    //                 tempBullets.push(element);
    //                 break;
    //             case elementTypes.tank:
    //                 tempTanks.push(element);

    //                 break;
    //         }
    //     }
    //     setBoardRowsCount(game.boardSize.rows);
    //     setBoardColumnsCount(game.boardSize.columns);
    //     // setOpponentTanks(tempOpponentTanks);
    //     // setTanks(tempTanks); 

    //     uploadGame(gameId, "ben", game.boardSize, tempWalls, tempTanks, tempTargets, map);
    // }, [isPlayerLoggedIn]);





    return (<HeaderView></HeaderView>);
}

export default HeaderPresenter;