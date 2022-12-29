import { useEffect } from "react";
import TankView from "../views/TankView";
import { useRecoilState } from "recoil";
import { blockSizeAtom, bulletsAtom, tanksAtom, boardRowsCountAtom, boardColumnsCountAtom, wallsAtom, targetsAtom, opponentTanksAtom, canPerformActionAtom, timeBetweenActionsAtom, gameIdAtom, opponentTargetsAtom, orientations, isGameStartedAtom } from "../model/Game";

import { db, uploadBullet, uploadTank, uploadTanks, writeTanks } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";

function TankPresenter() {

    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [tanks, setTanks] = useRecoilState(tanksAtom);
    const [targets, setTargets] = useRecoilState(targetsAtom);
    const [opponentTanks, setOpponentTanks] = useRecoilState(opponentTanksAtom);
    const [walls, setWalls] = useRecoilState(wallsAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [canPerformAction, setCanPerformAction] = useRecoilState(canPerformActionAtom);
    const [timeBetweenActions, setTimeBetweenActions] = useRecoilState(timeBetweenActionsAtom);
    const [opponentTargets, setOpponentTargets] = useRecoilState(opponentTargetsAtom);
    const [isGameStarted, setIsGameStarted] = useRecoilState(isGameStartedAtom);



    function getElement(row, column) {

        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            if (tank.position.r == row && tank.position.c == column) {
                return tank
            }
        }
        for (let i = 0; i < opponentTanks.length; i++) {
            const opponentTank = opponentTanks[i];
            if (opponentTank.position.r == row && opponentTank.position.c == column) {
                return opponentTank
            }
        }
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            if (target.position.r == row && target.position.c == column) {
                return target
            }
        }
        for (let i = 0; i < opponentTargets.length; i++) {
            const opponentTarget = opponentTargets[i];
            if (opponentTarget.position.r == row && opponentTarget.position.c == column) {
                return opponentTarget
            }
        }
        for (let i = 0; i < walls.length; i++) {
            const wall = walls[i];
            if (wall.position.r == row && wall.position.c == column) {
                return wall
            }
        }

    }

    function moveTank(movingOrientation) {


        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            let tankFuturePosR = 0;
            let tankFuturePosC = 0;
            let tankOrientation = orientations.up;

            switch (movingOrientation) {
                case orientations.up:
                    tankFuturePosR = tank.orientation == orientations.up ? tank.position.r - 1 : tank.position.r;
                    tankFuturePosC = tank.position.c;
                    tankOrientation = orientations.up;
                    break;

                case orientations.down:
                    tankFuturePosR = tank.orientation == orientations.down ? tank.position.r + 1 : tank.position.r;
                    tankFuturePosC = tank.position.c;
                    tankOrientation = orientations.down;
                    break;

                case orientations.left:
                    tankFuturePosR = tank.position.r;
                    tankFuturePosC = tank.orientation == orientations.left ? tank.position.c - 1 : tank.position.c;
                    tankOrientation = orientations.left;
                    break;
                case orientations.right:
                    tankFuturePosR = tank.position.r;
                    tankFuturePosC = tank.orientation == orientations.right ? tank.position.c + 1 : tank.position.c;
                    tankOrientation = orientations.right;
                    break;
            }

            const elementInFrontOfTank = getElement(tankFuturePosR, tankFuturePosC);
            console.log("element in front of tank is: ", tankFuturePosR, "-", tankFuturePosC, ": ", elementInFrontOfTank);
            let updatedTank = {
                ...tank,
                orientation: tankOrientation,
            };
            if (elementInFrontOfTank && elementInFrontOfTank.blocked || tankFuturePosR < 0 || tankFuturePosR >= boardRowsCount || tankFuturePosC < 0 || tankFuturePosC >= boardColumnsCount) {
                console.log("blocked");
            } else {
                console.log("future: ", tankFuturePosR, "-", tankFuturePosC)
                updatedTank = {
                    ...tank, position: {
                        r: tankFuturePosR,
                        c: tankFuturePosC
                    },
                }
            }

            uploadTank(gameId, updatedTank);

        }


    }

    function shootBullet() {

        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            const tankPos = tank.position;
            const bullet = {
                ...tank.bullet,
                id: "b" + Math.ceil(Math.random() * 1000),
                ownerId: playerId,
                orientation: tank.orientation,
                position: {
                    r: tankPos.r,
                    c: tankPos.c,
                }
            };
            uploadBullet(gameId, bullet);
        }

    }

    useEffect(() => {

        function handleKeydown(event) {


            if (!isGameStarted) {
                return;
            }
            // Update the position based on the arrow keys 

            // if (!canPerformAction) {
            //     setTimeout(() => {
            //         setCanPerformAction(true);
            //     }, timeBetweenActions);
            //     return;
            // }

            // setCanPerformAction(false);

            if (event.key === ' ') {
                shootBullet();

            } else if (event.key === 'ArrowUp') {
                moveTank(orientations.up);
            } else if (event.key === 'ArrowDown') {
                moveTank(orientations.down);
            } else if (event.key === 'ArrowLeft') {
                moveTank(orientations.left);
            } else if (event.key === 'ArrowRight') {
                moveTank(orientations.right);
            }
        }


        window.addEventListener('keydown', handleKeydown);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [tanks, walls, canPerformAction, isGameStarted]);



    useEffect(() => {
        const tanksRef = ref(db, 'games/' + gameId + "/tanks/");
        const unsubscriber = onValue(tanksRef, (snapshot) => {
            const tanks = snapshot.val();
            if (tanks) {
                const fetchedTanks = Object.values(tanks);
                console.log("fetched tanks", fetchedTanks)
                let tempTanks = [];
                let tempOpponentTanks = [];
                for (let i = 0; i < fetchedTanks.length; i++) {
                    if (fetchedTanks[i].ownerId == playerId) {
                        console.log("tank owned by me", fetchedTanks[i]);
                        tempTanks.push(fetchedTanks[i]);
                    } else {
                        console.log("tank owned by opponent", fetchedTanks[i]);
                        tempOpponentTanks.push(fetchedTanks[i]);
                    }
                }
                setTanks(tempTanks);
                setOpponentTanks(tempOpponentTanks);
            }
        });

        return unsubscriber;
    }, []);

    function drawTanks(element) {
        console.log("drawing tanks");
        let rotation = 0;
        switch (element.orientation) {
            case orientations.right:
                rotation = 90;
                break;
            case orientations.down:
                rotation = 180;
                break;
            case orientations.left:
                rotation = 270;
                break;

        }


        return <div key={element.id} className="tank-holder" style={{
            left: element.position.c * blockSize,
            top: element.position.r * blockSize,
            transform: 'rotate(' + rotation + 'deg)'
        }}>
            <TankView
                size={blockSize}
                name={element.name}
                id={element.id}
                color={element.color}
                damageTaken={element.damageTaken}
                maxHealth={element.maxHealth}
            ></TankView>
        </div>;


    }


    return (<div>
        {tanks.map(drawTanks)}
        {opponentTanks.map(drawTanks)}
    </div>
    );
}

export default TankPresenter;