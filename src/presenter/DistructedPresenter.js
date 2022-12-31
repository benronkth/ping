import { useRecoilState } from "recoil";
import { blockSizeAtom, distructedsAtom, gameIdAtom } from "../model/Game";
import DistructedView from "../views/DistructedView";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";

function DistructedPresenter() {
    const [distructeds, setDistructeds] = useRecoilState(distructedsAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);


    useEffect(() => {
        const distructedsRef = ref(db, 'games/' + gameId + "/distructeds");
        return onValue(distructedsRef, (snapshot) => {
            const snapshotValue = snapshot.val();
            if (snapshotValue) {
                const tempDistructeds = Object.values(snapshotValue);
                setDistructeds(tempDistructeds);
            } else {
                setDistructeds([]);
            }
        });
    }, []);


    function drawDistructed(element) {
        // console.log("drawing distructeds");
        return <DistructedView key={element.id}
            id={element.id}
            position={element.position}
            size={blockSize}
            name={element.name}
        > ({element.r}) </DistructedView>;

    }
    return (<div>
        {distructeds.map(drawDistructed)}</div>);
}

export default DistructedPresenter;