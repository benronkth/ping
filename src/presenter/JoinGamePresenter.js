import { useRecoilState } from "recoil";
import { blockSizeAtom, boardColumnsCountAtom, boardMarginLeftAtom, boardMarginTopAtom, boardRowsCountAtom, elementTypes, gameIdAtom, getLocations, getRandomColor, isGameCreatedAtom, joinedPlayersAtom, orientations } from "../model/Game";
import JoinGameView from "../views/JoinGameView";
import { db, uploadPlayer, uploadTank, uploadTarget } from "../firebase/firebase";
import { getNewPlayer, playerIdAtom, playerNameAtom } from "../model/User";
import { get, onValue, ref } from "firebase/database";

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

    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);


    // function onCreateGameClicked(event) {
    //     event.preventDefault();
    //     console.log("creating the game!");
    //     let elements = [];
    //     for (let r = 0; r < boardRowsCount; r++) {
    //         let row = "";
    //         for (let c = 0; c < boardColumnsCount; c++) {
    //             if (Math.random() < (wallRatio / 100.0)) {
    //                 row += "w"
    //             } else {
    //                 row += "s"
    //             }
    //         }
    //         elements.push(row);
    //     }

    //     const lastRow = elements[elements.length - 1];
    //     elements[elements.length - 1] = lastRow.substring(0, lastRow.length - 2) + "a" + "b"
    //     const map = {
    //         elements,
    //         w: {
    //             name: "",
    //             type: elementTypes.wall,
    //             blocked: true,
    //             distructable: true,
    //             maxHealth: 50,
    //             damageTaken: 0,
    //             position: {
    //                 r: 0,
    //                 c: 0,
    //             }
    //         },
    //     a: {
    //         name: playerName,
    //         ownerId: playerId,
    //         type: elementTypes.tank,
    //         orientation: orientations.up,
    //         blocked: true,
    //         distructable: true,
    //         maxHealth: 50,
    //         damageTaken: 0,
    //         position: {
    //             r: 0,
    //             c: 1,
    //         },
    //         bullet: {
    //             name: "bullet",
    //             type: elementTypes.bullet,
    //             orientation: orientations.up,
    //             attack: 8,
    //             position: {
    //                 r: 0,
    //                 c: 0,
    //             }
    //         }
    //     },
    //     b: {
    //         name: playerName,
    //         ownerId: playerId,
    //         type: elementTypes.target,
    //         blocked: true,
    //         distructable: true,
    //         maxHealth: 150,
    //         damageTaken: 0,
    //         position: {
    //             r: 0,
    //             c: 0,
    //         }
    //     },
    // };

    // console.log(map);
    // const game = createGame(map);
    // let tempWalls = [];
    // let tempTanks = [];
    // let tempTargets = [];
    // let tempBullets = [];

    // for (let i = 0; i < game.board.length; i++) {
    //     const element = game.board[i];
    //     switch (element.type) {
    //         case elementTypes.wall:
    //             tempWalls.push(element);
    //             break;
    //         case elementTypes.target:
    //             tempTargets.push(element);
    //             break;
    //         case elementTypes.bullet:
    //             tempBullets.push(element);
    //             break;
    //         case elementTypes.tank:
    //             tempTanks.push(element);

    //             break;
    //     }
    // }
    //     setBoardRowsCount(game.boardSize.rows);
    //     setBoardColumnsCount(game.boardSize.columns);
    //     // setOpponentTanks(tempOpponentTanks);
    //     // setTanks(tempTanks); 
    //     const generatedGameId = Math.ceil(Math.random() * 10000);
    //     uploadGame(generatedGameId, "ben", game.boardSize, tempWalls, tempTanks, tempTargets, map);
    //     setGameId(generatedGameId);
    //     setIsGameCreated(true);
    //     resizeBlocks();
    // }


    function resizeBlocks() {
        const width = window.innerWidth;
        const height = window.innerHeight - 100;

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
        setGameId(parseInt(value));
    }
    async function onJoinGameClicked(event) {
        event.preventDefault();
        console.log("joining game...");
        const playerColor = getRandomColor();
        let boardColumns = 0;
        let boardRows = 0;

        // const boardRowsRef = ref(db, 'games/' + gameId + "/boardSize/rows");
        // const rowsUnsubscriber = onValue(boardRowsRef, (snapshot) => {
        //     boardRows = snapshot.val();
        //     console.log("Rows is: ", boardRows);
        //     setBoardRowsCount(boardRows);
        // });

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
        const player = getNewPlayer(playerId, playerName, playerColor, locations);
        uploadPlayer(gameId, player);
        uploadTarget(gameId, {
            name: playerName.substring(0, 3),
            ownerId: playerId,
            color: playerColor,
            type: elementTypes.target,
            id: Math.ceil(Math.random() * 1000),
            blocked: true,
            distructable: true,
            maxHealth: 150,
            damageTaken: 0,
            position: {
                r: locations.target.r,
                c: locations.target.c,
            }
        });

        uploadTank(gameId, {
            name: playerName.substring(0, 3),
            ownerId: playerId,
            color: playerColor,
            type: elementTypes.tank,
            orientation: orientations.up,
            blocked: true,
            distructable: true,
            maxHealth: 50,
            damageTaken: 0,
            position: {
                r: locations.tank.r,
                c: locations.tank.c,
            },
            bullet: {
                name: "bullet",
                type: elementTypes.bullet,
                orientation: orientations.up,
                attack: 8,
                position: {
                    r: locations.tank.r,
                    c: locations.tank.c,
                }
            }
        }
        );

        setIsGameCreated(true);
        resizeBlocks();
    }
    return (<JoinGameView
        onGameIdChanged={onGameIdChanged}
        onJoinGameClicked={onJoinGameClicked}

    ></JoinGameView>);
}

export default JoinGamePresenter;