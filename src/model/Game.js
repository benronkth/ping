import { atom } from "recoil";
import { maps } from "../maps/maps";


export const stateAtom = atom({
    key: 'stateAtom',
    default: {
        boardSize: {
            width: 100,
            height: 100
        },
        board: [],
        bullets: [],
        tanks: [],


    },
});



export function createGame(params) {

    const map = maps.map1;
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
                id: r + "-" + c,
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
        bullets: map.bullets,
        tanks: map.tanks
    }
}

