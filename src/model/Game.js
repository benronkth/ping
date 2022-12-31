import { atom } from "recoil";


export const gameModes = {
    versus: "versus",
    teamVersusTeams: "teamVersusTeams",
    teamsVersusAI: "teamsVersusAI",
}

export const elementTypes = {
    space: "space",
    wall: "wall",
    target: "target",
    tank: "tank",
    bullet: "bullet",
    distructed: "distructed",
    artifact: "artifact",
}
export const artifactTypes = {
    weapon: "weapon", 
    health: "health"
}

export const orientations = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

export const artifactExpiry = 5;



export const newlyCreatedGamesAtom = atom({
    key: 'newlyCreatedGamesAtom',
    default: [],
});

export const acheivedArtifactsAtom = atom({
    key: 'acheivedArtifactsAtom',
    default: [],
});

export const timeBetweenActionsAtom = atom({
    key: 'timeBetweenActionsAtom',
    default: 0,
});
export const gameSpeedAtom = atom({
    key: 'gameSpeedAtom',
    default: 3,
});

export const boardRowsCountAtom = atom({
    key: 'boardRowsCountAtom',
    default: 20,
});
export const boardColumnsCountAtom = atom({
    key: 'boardColumnsCountAtom',
    default: 30,
});


export const boardMarginLeftAtom = atom({
    key: 'boardMarginLeftAtom',
    default: 0,
});
export const boardMarginTopAtom = atom({
    key: 'boardMarginTopAtom',
    default: 0,
});

export const blockSizeAtom = atom({
    key: 'blockSizeAtom',
    default: 48,
});


export const artifactsAtom = atom({
    key: 'artifactsAtom',
    default: [],
});

export const wallsAtom = atom({
    key: 'wallsAtom',
    default: [],
});



export const tanksAtom = atom({
    key: 'tanksAtom',
    default: [],
});


export const opponentTanksAtom = atom({
    key: 'opponentTanksAtom',
    default: [],
});



export const targetsAtom = atom({
    key: 'targetsAtom',
    default: [],
});

export const opponentTargetsAtom = atom({
    key: 'opponentTargetsAtom',
    default: [],
});

export const bulletsAtom = atom({
    key: 'bulletsAtom',
    default: [],
});

// export const opponentBulletsAtom = atom({
//     key: 'opponentBulletsAtom',
//     default: [],
// });



export const distructedsAtom = atom({
    key: 'distructedsAtom',
    default: [],
});


export const gameOwnerIdAtom = atom({
    key: 'gameOwnerIdAtom',
    default: 0,
});
export const gameModeAtom = atom({
    key: 'gameModeAtom',
    default: 0,
});
export const isAiEnabledAtom = atom({
    key: 'isAiEnabledAtom',
    default: false,
});
export const aiCountAtom = atom({
    key: 'aiCountAtom',
    default: 10,
});

export const wallRatioAtom = atom({
    key: 'wallRatioAtom',
    default: 50,
});

export const gameIdAtom = atom({
    key: 'gameIdAtom',
    default: 0,
});
export const isGameCreatedAtom = atom({
    key: 'isGameCreatedAtom',
    default: false,
});
export const isGameStartedAtom = atom({
    key: 'isGameStartedAtom',
    default: false,
});
export const joinedPlayersAtom = atom({
    key: 'joinedPlayersAtom',
    default: [],
});

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export function getInfrontPostion(element) {

    let elementPosR = 0;
    let elementPosC = 0;
    switch (element.orientation) {
        case orientations.up:
            elementPosR = element.position.r - 1;
            elementPosC = element.position.c;
            break;

        case orientations.down:
            elementPosR = element.position.r + 1;
            elementPosC = element.position.c;
            break;

        case orientations.left:
            elementPosR = element.position.r;
            elementPosC = element.position.c - 1;
            break;
        case orientations.right:
            elementPosR = element.position.r;
            elementPosC = element.position.c + 1;
            break;
    }

    return {
        r: elementPosR,
        c: elementPosC,
    }
}

export function getLocations(numOfPlayers, boardRowsCount, boardColumnsCount) {


    switch (numOfPlayers) {
        case 0:
            return {
                target: {
                    r: 0,
                    c: 0
                },
                tank: {
                    r: 2,
                    c: 2
                }
            };
        case 1:
            return {
                target: {
                    r: boardRowsCount - 1,
                    c: boardColumnsCount - 1,
                },
                tank: {
                    r: boardRowsCount - 3,
                    c: boardColumnsCount - 3
                }
            }
        case 2:
            return {
                target: {
                    r: boardRowsCount - 1,
                    c: 0,
                },
                tank: {
                    r: boardRowsCount - 3,
                    c: 2
                }
            }
        case 3:
            return {
                target: {
                    r: 0,
                    c: boardColumnsCount - 1,
                },
                tank: {
                    r: 2,
                    c: boardColumnsCount - 3
                }
            }
        default:
            return {
                target: {
                    r: Math.floor(Math.random() * (boardRowsCount - 1)),
                    c: Math.floor(Math.random() * (boardColumnsCount - 1)),
                },
                tank: {
                    r: Math.floor(Math.random() * (boardRowsCount - 1)),
                    c: Math.floor(Math.random() * (boardColumnsCount - 1))
                }
            }
    }


}

export function createGame(map) {

    // const map = maps.map2;
    console.log(map);
    const boardRows = map.elements.length;
    const boardColumns = map.elements[0].length;
    let board = Array.from(Array(boardRows), () => new Array(boardColumns));
    for (let r = 0; r < boardRows; r++) {
        const row = map.elements[r];
        for (let c = 0; c < boardColumns; c++) {
            const pos = (r * boardColumns) + c;
            if (!row) { continue; }

            let element = map[row.charAt(c)];
            element = {
                ...element,
                id: r + "-" + c + "-" + Math.ceil(Math.random() * 1000),
                position: {
                    r, c
                }
            };
            board[pos] = element;
        }
    }




    return {
        boardSize: {
            rows: boardRows,
            columns: boardColumns,
        },
        board,
    }
}

