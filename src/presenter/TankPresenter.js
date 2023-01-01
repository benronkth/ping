import { useEffect } from "react";
import TankView from "../views/TankView";
import { useRecoilState } from "recoil";
import {
    blockSizeAtom, tanksAtom, boardRowsCountAtom, boardColumnsCountAtom,
    wallsAtom, targetsAtom, opponentTanksAtom,
    timeBetweenActionsAtom, gameIdAtom, opponentTargetsAtom, orientations,
    isGameStartedAtom, getInfrontPostion, gameSpeedAtom, artifactsAtom, elementTypes, artifactTypes, joinedPlayersAtom, gameLosersAtom, bulletsAtom
} from "../model/Game";

import { db, removeArtifact, removeBullet, removeTank, uploadBullet, uploadDistructeds, uploadPlayer, uploadTank } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";
import { getNewTank, getNewWeapon } from "../model/Elements";






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
    const [timeBetweenActions, setTimeBetweenActions] = useRecoilState(timeBetweenActionsAtom);
    const [opponentTargets, setOpponentTargets] = useRecoilState(opponentTargetsAtom);
    const [isGameStarted, setIsGameStarted] = useRecoilState(isGameStartedAtom);
    const [gameSpeed, setGameSpeed] = useRecoilState(gameSpeedAtom);
    const [artifacts, setArtifacts] = useRecoilState(artifactsAtom);
    const [gameLosers, setGameLosers] = useRecoilState(gameLosersAtom);
    const [bullets, setBullets] = useRecoilState(bulletsAtom);

    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);


    function getElement(row, column) {

        for (let i = 0; i < artifacts.length; i++) {
            const artifact = artifacts[i];
            if (artifact.position.r === row && artifact.position.c === column) {
                return artifact
            }
        }
        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            if (tank.position.r === row && tank.position.c === column) {
                return tank
            }
        }
        for (let i = 0; i < opponentTanks.length; i++) {
            const opponentTank = opponentTanks[i];
            if (opponentTank.position.r === row && opponentTank.position.c === column) {
                return opponentTank
            }
        }
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            if (target.position.r === row && target.position.c === column) {
                return target
            }
        }
        for (let i = 0; i < opponentTargets.length; i++) {
            const opponentTarget = opponentTargets[i];
            if (opponentTarget.position.r === row && opponentTarget.position.c === column) {
                return opponentTarget
            }
        }
        for (let i = 0; i < walls.length; i++) {
            const wall = walls[i];
            if (wall.position.r === row && wall.position.c === column) {
                return wall
            }
        }
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            if (bullet.position.r === row && bullet.position.c === column) {
                return bullet
            }
        }

    }

    function moveTank(movingOrientation) {


        let distructedList = [];
        for (let i = 0; i < tanks.length; i++) {
            let tempMovingOrientation = movingOrientation;
            const tank = tanks[i];
            let tankFuturePosR = 0;
            let tankFuturePosC = 0;
            let tankOrientation = orientations.up;

            if (tank.invertInput) {
                switch (movingOrientation) {
                    case orientations.up:
                        tempMovingOrientation = orientations.down;
                        break;

                    case orientations.down:
                        tempMovingOrientation = orientations.up;
                        break;

                    case orientations.left:
                        tempMovingOrientation = orientations.right;
                        break;
                    case orientations.right:
                        tempMovingOrientation = orientations.left;
                        break;
                }
            }

            switch (tempMovingOrientation) {
                case orientations.up:
                    tankFuturePosR = tank.orientation === orientations.up ? tank.position.r - 1 : tank.position.r;
                    tankFuturePosC = tank.position.c;
                    tankOrientation = orientations.up;
                    break;

                case orientations.down:
                    tankFuturePosR = tank.orientation === orientations.down ? tank.position.r + 1 : tank.position.r;
                    tankFuturePosC = tank.position.c;
                    tankOrientation = orientations.down;
                    break;

                case orientations.left:
                    tankFuturePosR = tank.position.r;
                    tankFuturePosC = tank.orientation === orientations.left ? tank.position.c - 1 : tank.position.c;
                    tankOrientation = orientations.left;
                    break;
                case orientations.right:
                    tankFuturePosR = tank.position.r;
                    tankFuturePosC = tank.orientation === orientations.right ? tank.position.c + 1 : tank.position.c;
                    tankOrientation = orientations.right;
                    break;
            }

            const elementInFrontOfTank = getElement(tankFuturePosR, tankFuturePosC);
            console.log("element in front of tank is: ", tankFuturePosR, "-", tankFuturePosC, ": ", elementInFrontOfTank);
            let updatedTank = {
                ...tank,
                orientation: tankOrientation,
            };









            // Tank movement 
            if (elementInFrontOfTank && elementInFrontOfTank.blocked || tankFuturePosR < 0 || tankFuturePosR >= boardRowsCount || tankFuturePosC < 0 || tankFuturePosC >= boardColumnsCount) {
                console.log("blocked");
            } else {


                console.log("future: ", tankFuturePosR, "-", tankFuturePosC)
                updatedTank = {
                    ...updatedTank, position: {
                        r: tankFuturePosR,
                        c: tankFuturePosC
                    },
                }


                if (elementInFrontOfTank && elementInFrontOfTank.type === elementTypes.bullet) {

                    updatedTank = {
                        ...updatedTank,
                        damageTaken: updatedTank.damageTaken + elementInFrontOfTank.attack
                    }
                    const distructedElement = {
                        name: "Exploded",
                        type: elementTypes.distructed,
                        id: "d" + Math.ceil(Math.random() * 1000),
                        blocked: false,
                        position: {
                            r: elementInFrontOfTank.position.r,
                            c: elementInFrontOfTank.position.c
                        }
                    }
                    distructedList.push(distructedElement);
                    let shootAudio = process.env.PUBLIC_URL + "sounds/" + elementInFrontOfTank.destroyAudio;
                    var shootAudioPlayer = new Audio(shootAudio);
                    shootAudioPlayer.volume = 0.05;
                    shootAudioPlayer.play();
                    removeBullet(gameId, elementInFrontOfTank);
                }


                // artifacts
                if (elementInFrontOfTank && elementInFrontOfTank.type === elementTypes.artifact) {

                    const acheivedArtifact = elementInFrontOfTank;
                    console.log("tank position!!!!!!!!!!!!!!!!!!! ", updatedTank);
                    console.log("ARTIFACT ACHEIVED!!!!!!!!!!!!!!!!!!! ", acheivedArtifact.id, acheivedArtifact);

                    switch (acheivedArtifact.artifactType) {
                        case artifactTypes.tank:
                            updatedTank = {
                                ...updatedTank,
                                position: acheivedArtifact.randomPosition ? acheivedArtifact.randomPosition : updatedTank.position,
                                damageTaken: acheivedArtifact.damageTaken ?
                                    Math.max(Math.floor(updatedTank.damageTaken - acheivedArtifact.damageTaken), 0)
                                    : updatedTank.damageTaken,
                                maxHealth: acheivedArtifact.maxHealth ? Math.floor(updatedTank.maxHealth + acheivedArtifact.maxHealth) : updatedTank.maxHealth,
                                attack: acheivedArtifact.attack ? Math.floor(updatedTank.attack + acheivedArtifact.attack) : updatedTank.attack,
                                weapon: acheivedArtifact.weapon ? { ...acheivedArtifact.weapon, ownerTankId: updatedTank.id } : updatedTank.weapon,
                                invertInput: acheivedArtifact.invertInput !== undefined ? acheivedArtifact.invertInput : updatedTank.invertInput,
                            }

                            break;
                        case artifactTypes.world:

                            if (acheivedArtifact.swapTank) {
                                if (opponentTanks.length > 0) {

                                    let randomOpponentTank = opponentTanks[Math.floor(Math.random() * opponentTanks.length)];
                                    const randomOpponentTankOwnerId = randomOpponentTank.ownerId;
                                    const randomOpponentTankName = randomOpponentTank.name;


                                    // removeTank(gameId, randomOpponentTank);
                                    // removeTank(gameId, updatedTank);
                                    randomOpponentTank = {
                                        ...randomOpponentTank,
                                        ownerId: playerId,
                                        name: updatedTank.name,
                                    }

                                    uploadTank(gameId, randomOpponentTank);
                                    updatedTank = {
                                        ...updatedTank,
                                        ownerId: randomOpponentTankOwnerId,
                                        name: randomOpponentTankName,
                                    }

                                }
                            }

                            break;
                    }

                    let shootAudio = process.env.PUBLIC_URL + "sounds/" + acheivedArtifact.audio;
                    var shootAudioPlayer = new Audio(shootAudio);
                    shootAudioPlayer.volume = 0.1;
                    shootAudioPlayer.play();
                    removeArtifact(gameId, acheivedArtifact.id);

                }

            }
            if (updatedTank.damageTaken >= updatedTank.maxHealth) {
                removeTank(gameId, updatedTank);
                for (let i = 0; i < joinedPlayers.length; i++) {
                    const player = joinedPlayers[i];
                    if (player.id === playerId) {
                        const tempDeathCount = player.deathCount + 1;
                        if (tempDeathCount < player.maxLivesCount) {
                            uploadPlayer(gameId, {
                                ...player,
                                deathCount: tempDeathCount,
                            });
                            uploadTank(gameId, getNewTank({
                                name: updatedTank.name,
                                ownerId: updatedTank.ownerId,
                                color: updatedTank.color,
                                position: {
                                    r: player.locations.tank.r,
                                    c: player.locations.tank.c
                                },
                            }));

                        } else {
                            uploadPlayer(gameId, {
                                ...player,
                                deathCount: tempDeathCount,
                                isAlive: false
                            });
                        }

                    }
                }
            } else {
                uploadTank(gameId, updatedTank);
            }


        }
        uploadDistructeds(gameId, distructedList);


    }

    function shootBullet() {

        for (let i = 0; i < tanks.length; i++) {
            let updatedTank = tanks[i];
            // const infrontPosition = getInfrontPostion(tank);


            if (updatedTank.weapon.ammo < 1) {
                updatedTank = {
                    ...updatedTank,
                    weapon: getNewWeapon()
                }
            }

            

            const bullet = {
                ...updatedTank.weapon,
                id: Math.ceil(Math.random() * 10000),
                ownerId: playerId,
                orientation: updatedTank.orientation,
                type: elementTypes.bullet,
                position: {
                    // r: infrontPosition.r,
                    // c: infrontPosition.c,
                    r: updatedTank.position.r,
                    c: updatedTank.position.c,
                }
            };
            updatedTank = {
                ...updatedTank,
                weapon: {
                    ...updatedTank.weapon,
                    ammo: updatedTank.weapon.ammo - 1
                }
            }
            uploadTank(gameId, updatedTank);
            uploadBullet(gameId, bullet);
            let shootAudio = process.env.PUBLIC_URL + "sounds/" + bullet.audio;
            var shootAudioPlayer = new Audio(shootAudio);
            shootAudioPlayer.volume = 0.1;
            shootAudioPlayer.play();
        }





    }

    useEffect(() => {

        function handleKeydown(event) {

            if (!isGameStarted || gameLosers.filter(p => p.id === playerId).length > 0) {
                return;
            }
            // Update the position based on the arrow keys


            if (timeBetweenActions % gameSpeed === 0) {
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
            setTimeBetweenActions((prevValue) => {
                return prevValue + 1;
            });


        }

        function handleKeyup(event) {
            setTimeBetweenActions(0);
        }

        window.addEventListener('keyup', handleKeyup);
        window.addEventListener('keydown', handleKeydown);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keyup', handleKeyup);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [timeBetweenActions, tanks, opponentTanks, targets, opponentTargets, walls, isGameStarted]);



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
                    if (fetchedTanks[i].ownerId === playerId) {
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
        return <TankView key={element.id}
            size={blockSize}
            tank={element}
        ></TankView>;

    }


    return (<div>
        {tanks.map(drawTanks)}
        {opponentTanks.map(drawTanks)}
    </div>
    );
}

export default TankPresenter;