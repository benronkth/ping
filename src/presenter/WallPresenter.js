import { useRecoilState } from "recoil";
import { blockSizeAtom, gameIdAtom, wallsAtom } from "../model/Game";
import WallView from "../views/WallView";
import { db } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

function WallPresenter() {

    const [walls, setWalls] = useRecoilState(wallsAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);


    useEffect(() => {
        const wallsRef = ref(db, 'games/' + gameId + "/walls");
        return onValue(wallsRef, (snapshot) => {
            const walls = snapshot.val();
            console.log("fetched walls is: ", walls);
            if (walls) {
                setWalls(Object.values(walls));
            } else {
                setWalls([]);
            }
        });
    }, []);


    function drawWalls(element) { 
        return <WallView key={element.id}
            wall={element}
            size={blockSize} 
        > ({element.r}) </WallView>;

    }
    return (<div>
        {walls.map(drawWalls)}</div>);
}

export default WallPresenter;