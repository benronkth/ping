import { useRecoilState } from "recoil";
import CreateGameView from "../views/CreateGameView";
import { aiCountAtom, blockSizeAtom, boardColumnsCountAtom, boardMarginLeftAtom, boardMarginTopAtom, boardRowsCountAtom, createGame, elementTypes, gameIdAtom, gameModeAtom, getLocations, getRandomColor, isAiEnabledAtom, isGameCreatedAtom, orientations, wallRatioAtom } from "../model/Game";
import { uploadGame } from "../firebase/firebase";
import { getNewPlayer, playerIdAtom, playerNameAtom } from "../model/User";

function CreateGamePresenter() {

    const [gameMode, setGameMode] = useRecoilState(gameModeAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [aiCount, setAiCount] = useRecoilState(aiCountAtom);
    const [wallRatio, setWallRatio] = useRecoilState(wallRatioAtom);
    const [isAiEnable, setIsAiEnable] = useRecoilState(isAiEnabledAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [isGameCreated, setIsGameCreated] = useRecoilState(isGameCreatedAtom);
    const [playerName, setPlayerName] = useRecoilState(playerNameAtom);
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [boardMarginLeft, setBoardMarginLeft] = useRecoilState(boardMarginLeftAtom);
    const [boardMarginTop, setBoardMarginTop] = useRecoilState(boardMarginTopAtom);




    function onGameModeChanged(event) {
        const value = event.target.value;
        setGameMode(value);
    }
    function onRowsChanged(event) {
        const value = event.target.value;
        console.log(event.target.value);
        setBoardRowsCount(parseInt(value));

    }
    function onColumnsChanged(event) {
        const value = event.target.value;
        console.log(event.target.value);
        setBoardColumnsCount(parseInt(value));

    }
    function onIsAiEnabledChanged(event) {
        const value = event.target.value;
        console.log(event.target.checked);
        setIsAiEnable(value);

    }
    function onAiCountChanged(event) {
        const value = event.target.value;
        console.log(event.target.value);
        setAiCount(parseInt(value));

    }
    function onWallRatioChanged(event) {
        const value = event.target.value;
        console.log(event.target.value);
        setWallRatio(parseInt(value));

    }
    function onCreateGameClicked(event) {
        event.preventDefault();
        console.log("creating the game!");
        let elements = [];
        for (let r = 0; r < boardRowsCount; r++) {
            let row = "";
            for (let c = 0; c < boardColumnsCount; c++) {
                if (Math.random() < (wallRatio / 100.0)) {
                    row += "w"
                } else {
                    row += "s"
                }
            }
            elements.push(row);
        }
        const playerColor = getRandomColor();
        const firstRow = elements[0];
        elements[0] = "b" + firstRow.substring(2, firstRow.length - 1) + "s";
        const secondRow = elements[2];
        elements[2] = secondRow.substring(0, 2) + "a" + secondRow.substring(3, secondRow.length - 4) + "s" + secondRow.substring(secondRow.length - 2);
        const secondToLastRow = elements[boardRowsCount - 3];
        elements[boardRowsCount - 3] = secondToLastRow.substring(0, 2) + "s" + secondToLastRow.substring(3, secondToLastRow.length - 4) + "s" + secondToLastRow.substring(secondToLastRow.length - 2);
        const lastRow = elements[boardRowsCount - 1];
        elements[boardRowsCount - 1] = "s" + lastRow.substring(2, lastRow.length - 1) + "s";

        const locations = getLocations(0, boardRowsCount, boardColumnsCount);
        console.log(locations);
        const map = {
            elements,
            w: {
                name: "",
                type: elementTypes.wall,
                blocked: true,
                distructable: true,
                maxHealth: 50,
                damageTaken: 0,
                position: {
                    r: 0,
                    c: 0,
                }
            },
            a: {
                name: playerName.substring(0, 3),
                ownerId: playerId,
                type: elementTypes.tank,
                orientation: orientations.up,
                color: playerColor,
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
                    color: playerColor,
                    attack: 8,
                    position: {
                        r: locations.tank.r,
                        c: locations.tank.c,
                    }
                }
            },
            b: {
                name: playerName.substring(0, 3),
                ownerId: playerId,
                type: elementTypes.target,
                color: playerColor,
                blocked: true,
                distructable: true,
                maxHealth: 150,
                damageTaken: 0,
                position: {
                    r: locations.target.r,
                    c: locations.target.c,
                }
            },
        };

        console.log(map);
        const game = createGame(map);
        let tempWalls = [];
        let tempTanks = [];
        let tempTargets = [];
        let tempBullets = [];

        for (let i = 0; i < game.board.length; i++) {
            const element = game.board[i];
            switch (element.type) {
                case elementTypes.wall:
                    tempWalls.push(element);
                    break;
                case elementTypes.target:
                    tempTargets.push(element);
                    break;
                case elementTypes.bullet:
                    tempBullets.push(element);
                    break;
                case elementTypes.tank:
                    tempTanks.push(element);

                    break;
            }
        }
        setBoardRowsCount(game.boardSize.rows);
        setBoardColumnsCount(game.boardSize.columns);
        const player = getNewPlayer(playerId, playerName, playerColor, locations);
        const generatedGameId = Math.ceil(Math.random() * 10000);
        uploadGame(generatedGameId, player, game.boardSize, tempWalls, tempTanks, tempTargets, map);
        setGameId(generatedGameId);
        setIsGameCreated(true);
        resizeBlocks();
    }


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



    return (<CreateGameView onGameModeChanged={onGameModeChanged}
        onRowsChanged={onRowsChanged}
        onColumnsChanged={onColumnsChanged}
        onIsAiEnabledChanged={onIsAiEnabledChanged}
        onAiCountChanged={onAiCountChanged}
        onCreateGameClicked={onCreateGameClicked}
        onWallRatioChanged={onWallRatioChanged}

        rows={boardRowsCount}
        columns={boardColumnsCount}
        aiCount={aiCount}
        wallRatio={wallRatio}
    ></CreateGameView>);
}

export default CreateGamePresenter;