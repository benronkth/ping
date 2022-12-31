import { useEffect } from "react";
import ArtifactView from "../views/ArtifactView";
import { playerIdAtom } from "../model/User";
import { artifactsAtom, blockSizeAtom, boardColumnsCountAtom, boardRowsCountAtom, bulletsAtom, gameIdAtom, gameOwnerIdAtom, isGameStartedAtom, joinedPlayersAtom, opponentTanksAtom, opponentTargetsAtom, tanksAtom, targetsAtom, wallsAtom } from "../model/Game";
import { db, removeArtifact, uploadArtifact } from "../firebase/firebase";
import { getNewResetDamageTakenArtifact, getNewRocketArtifact } from "../model/Elements";
import { useRecoilState } from "recoil";
import { onValue, ref } from "firebase/database";

function ArtifactPresenter() {

    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [gameOwnerId, setGameOwnerId] = useRecoilState(gameOwnerIdAtom);
    const [isGameStarted, setIsGameStarted] = useRecoilState(isGameStartedAtom);
    const [bullets, setBullets] = useRecoilState(bulletsAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [walls, setWalls] = useRecoilState(wallsAtom);
    const [tanks, setTanks] = useRecoilState(tanksAtom);
    const [targets, setTargets] = useRecoilState(targetsAtom);
    const [opponentTanks, setOpponentTanks] = useRecoilState(opponentTanksAtom);
    const [opponentTargets, setOpponentTargets] = useRecoilState(opponentTargetsAtom);
    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);
    const [artifacts, setArtifacts] = useRecoilState(artifactsAtom);


    function getElement(row, column) {

        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            if (tank.position.r === row && tank.position.c === column) {
                return tank;
            }
        }
        for (let i = 0; i < opponentTanks.length; i++) {
            const opponentTank = opponentTanks[i];
            if (opponentTank.position.r === row && opponentTank.position.c === column) {
                return opponentTank;
            }
        }
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            if (target.position.r === row && target.position.c === column) {
                return target;
            }
        }
        for (let i = 0; i < opponentTargets.length; i++) {
            const opponentTarget = opponentTargets[i];
            if (opponentTarget.position.r === row && opponentTarget.position.c === column) {
                return opponentTarget;
            }
        }
        return undefined;
    }

    useEffect(() => {

        if (isGameStarted) {

            const ref = setInterval(() => {

                // Craeting new artifacts

                let randomRow = Math.floor(Math.random() * boardRowsCount);
                let randomColumn = Math.floor(Math.random() * boardColumnsCount);

                while (getElement(randomRow, randomColumn)) {
                    // prevent creating artifact on tanks and targets.
                    randomRow = Math.floor(Math.random() * boardRowsCount);
                    randomColumn = Math.floor(Math.random() * boardColumnsCount);
                }

                let tempArtifacts = []


                tempArtifacts.push(getNewRocketArtifact({
                    position: {
                        r: randomRow,
                        c: randomColumn
                    }
                }));

                tempArtifacts.push(getNewResetDamageTakenArtifact({
                    damageTaken: (Math.ceil(Math.random() * 100) / 100),
                    position: {
                        r: randomRow,
                        c: randomColumn
                    }
                }));

                const tempArtifact = tempArtifacts[Math.floor(Math.random() * tempArtifacts.length)];
                uploadArtifact(gameId, tempArtifact);

            }, 1000);
            return () => {
                clearInterval(ref);
            };
        }
    }, [isGameStarted]);




    useEffect(() => {
        const artifactsRef = ref(db, 'games/' + gameId + "/artifacts/");
        const unsubscriber = onValue(artifactsRef, (snapshot) => {
            const artifactsSnapshot = snapshot.val();
            if (artifactsSnapshot) {
                let tempArtifacts = [];
                const fetchedArtifacts = Object.values(artifactsSnapshot);
                for (let i = 0; i < fetchedArtifacts.length; i++) {
                    const art = fetchedArtifacts[i];

                    if (art.expiryDate < Date.now()) {
                        removeArtifact(gameId, art.id);
                    } else {
                        tempArtifacts.push(art);
                    }

                }
                console.log("fetched artifact", tempArtifacts);
                setArtifacts(tempArtifacts);
            } else {
                setArtifacts([]);
            }
        });

        return unsubscriber;
    }, []);


    function drawArtifact(art) {
        return <ArtifactView key={art.id}
            artifact={art}
            size={blockSize}

        ></ArtifactView>

    }


    return (<div>
        {artifacts.map(drawArtifact)}
    </div>);
}

export default ArtifactPresenter;