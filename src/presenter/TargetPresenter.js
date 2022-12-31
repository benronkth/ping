import { useRecoilState } from "recoil";
import { blockSizeAtom, gameIdAtom, opponentTargetsAtom, targetsAtom } from "../model/Game";
import TargetView from "../views/TargetView";
import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";

function TargetPresenter() {
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [targets, setTargets] = useRecoilState(targetsAtom);
    const [opponentTargets, setOpponentTargets] = useRecoilState(opponentTargetsAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);



    useEffect(() => {
        const targetsRef = ref(db, 'games/' + gameId + "/targets");
        return onValue(targetsRef, (snapshot) => {
            const targets = snapshot.val();
            if (targets) {
                let tempTarget = [];
                let tempOpponentTarget = [];
                const fetchedTarget = Object.values(targets);
                console.log("targets are: ", fetchedTarget);
                for (let i = 0; i < fetchedTarget.length; i++) {
                    if (fetchedTarget[i].ownerId === playerId) {
                        tempTarget.push(fetchedTarget[i]);
                    } else {
                        tempOpponentTarget.push(fetchedTarget[i]);
                    }
                }
                setTargets(tempTarget);
                setOpponentTargets(tempOpponentTarget);
            } else {
                setTargets([]);
                setOpponentTargets([]);
            }
        });
    }, []);

    function drawTargets(element) { 
        return <TargetView   key={element.id}
            size={blockSize} 
            target={element}
        > </TargetView>;

    }

    return (<div>
        {targets.map(drawTargets)}
        {opponentTargets.map(drawTargets)}
    </div>);
}

export default TargetPresenter;