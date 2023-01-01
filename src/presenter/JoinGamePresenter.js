import { useRecoilState } from "recoil";
import { blockSizeAtom, boardColumnsCountAtom, boardMarginLeftAtom, boardMarginTopAtom, boardRowsCountAtom, elementTypes, gameIdAtom, gameLosersAtom, gameWinnersAtom, getLocations, getRandomColor, isGameCreatedAtom, isGameFinishedAtom, joinedPlayersAtom, orientations } from "../model/Game";
import JoinGameView from "../views/JoinGameView";
import { db, uploadPlayer, uploadTank, uploadTarget } from "../firebase/firebase";
import { playerIdAtom, playerNameAtom } from "../model/User";
import { get, ref } from "firebase/database";
import { getNewPlayer, getNewTank, getNewTarget } from "../model/Elements";

function JoinGamePresenter() {


    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [isGameCreated, setIsGameCreated] = useRecoilState(isGameCreatedAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [boardMarginLeft, setBoardMarginLeft] = useRecoilState(boardMarginLeftAtom);
    const [boardMarginTop, setBoardMarginTop] = useRecoilState(boardMarginTopAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [playerName, setPlayerName] = useRecoilState(playerNameAtom);
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [gameWinners, setGameWinners] = useRecoilState(gameWinnersAtom);
    const [gameLosers, setGameLosers] = useRecoilState(gameLosersAtom);
    const [isGameFinished, setIsGameFinished] = useRecoilState(isGameFinishedAtom);



    function resizeBlocks() {
        const width = window.innerWidth;
        const height = window.innerHeight - 120;

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


    function onGameIdChanged(event) {
        const value = event.target.value;
        console.log(value)
        try {
            if (!value) { return };
            if (value === NaN) { return };
            const intValue = parseInt(value);
            setGameId(intValue);
            if (intValue < 0) {
                setGameId(0);
            }
            if (intValue > 10000) {
                setGameId(10000);
            }
        } catch (error) {
        }
    }
    async function onJoinGameClicked(event) {
        event.preventDefault();
        console.log("joining game... Game id is: ", gameId);
        const playerColor = getRandomColor();
        let boardColumns = 0;
        let boardRows = 0;

        var boardRowsRef = ref(db, 'games/' + gameId + "/boardSize/rows");
        var snapshot = await get(boardRowsRef);
        boardRows = snapshot.val();
        console.log("Rows is: ", boardRows);
        setBoardRowsCount(boardRows);

        const boardColumnsRef = ref(db, 'games/' + gameId + "/boardSize/columns");
        var snapshot = await get(boardColumnsRef);
        boardColumns = snapshot.val();
        console.log("Columns is: ", boardColumns);
        setBoardColumnsCount(boardColumns);

        const playersRef = ref(db, 'games/' + gameId + "/players");
        var snapshot = await get(playersRef);
        const players = snapshot.val();
        const fetchedPlayers = Object.values(players);
        console.log("fetched players", fetchedPlayers, fetchedPlayers.length);

        const locations = getLocations(fetchedPlayers.length, boardRows, boardColumns);
        console.log("locations: ", locations);
        let player = getNewPlayer({ id: playerId, name: playerName, color: playerColor, locations });
        const newTarget = getNewTarget({
            name: playerName,
            ownerId: playerId,
            color: playerColor,
            id: "t" + Math.ceil(Math.random() * 1000),
            position: {
                r: locations.target.r,
                c: locations.target.c,
            }
        });
        uploadTarget(gameId, newTarget);

        const newTank = getNewTank({
            name: playerName,
            ownerId: playerId,
            color: playerColor,
            id: "t" + Math.ceil(Math.random() * 1000),
            position: {
                r: locations.tank.r,
                c: locations.tank.c,
            },
        });
        uploadTank(gameId, newTank);
        uploadPlayer(gameId, player);
        resizeBlocks();
        setIsGameCreated(true);

    }
    return (<JoinGameView
        onGameIdChanged={onGameIdChanged}
        onJoinGameClicked={onJoinGameClicked}

    ></JoinGameView>);
}

export default JoinGamePresenter;