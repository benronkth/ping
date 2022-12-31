import { useEffect } from "react";
import TankView from "../views/TankView";
import { useRecoilState } from "recoil";
import {
    blockSizeAtom, tanksAtom, boardRowsCountAtom, boardColumnsCountAtom,
    wallsAtom, targetsAtom, opponentTanksAtom,
    timeBetweenActionsAtom, gameIdAtom, opponentTargetsAtom, orientations,
    isGameStartedAtom, getInfrontPostion, gameSpeedAtom, artifactsAtom, elementTypes, artifactTypes, joinedPlayersAtom, gameLosersAtom, bulletAudioAtom
} from "../model/Game";

import { db, removeArtifact, removeTank, uploadBullet, uploadPlayer, uploadPlayerWeapon, uploadTank } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";
import { getNewBullet } from "../model/Elements";

// import shootAudio from '../assets/audio/pistol.mp3'
// import damageTakenArtifactCollectedAudio from '../assets/audio/damageReset.wav'
// import weaponArtifactCollectedAudio from '../assets/audio/weaponCollect.wav' 

// var shootAudioPlayer = new Audio(shootAudio);
// shootAudioPlayer.volume = 0.1;

// var damageTakenArtifactCollectedAudioPlayer = new Audio(damageTakenArtifactCollectedAudio);
// damageTakenArtifactCollectedAudioPlayer.volume = 0.1;

// var weaponArtifactCollectedAudioPlayer = new Audio(weaponArtifactCollectedAudio);
// weaponArtifactCollectedAudioPlayer.volume = 0.1;





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
    const [bulletAudio, setBulletAudio] = useRecoilState(bulletAudioAtom);

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

    }

    function moveTank(movingOrientation) {


        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            let tankFuturePosR = 0;
            let tankFuturePosC = 0;
            let tankOrientation = orientations.up;

            switch (movingOrientation) {
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
                // artifacts
                if (elementInFrontOfTank && elementInFrontOfTank.type === elementTypes.artifact) {
                    const acheivedArtifact = elementInFrontOfTank;
                    console.log("ARTIFACT ACHEIVED!!!!!!!!!!!!!!!!!!! ", acheivedArtifact.id, acheivedArtifact);

                    switch (acheivedArtifact.artifactType) {
                        case artifactTypes.tank:
                            updatedTank = {
                                ...updatedTank,
                                damageTaken: acheivedArtifact.damageTaken ?
                                    Math.max(Math.floor(updatedTank.damageTaken - acheivedArtifact.damageTaken), 0)
                                    : updatedTank.damageTaken,
                                maxHealth: acheivedArtifact.maxHealth ? Math.floor(updatedTank.maxHealth + acheivedArtifact.maxHealth) : updatedTank.maxHealth,
                                attack: acheivedArtifact.attack ? Math.floor(updatedTank.attack + acheivedArtifact.attack) : updatedTank.attack,
                                bullet: acheivedArtifact.bullet ? acheivedArtifact.bullet : updatedTank.bullet,
                            }

                            console.log("after updateing :", updatedTank);
                            if (acheivedArtifact.bullet) {
                                uploadPlayerWeapon(gameId, playerId, acheivedArtifact.bullet);
                            }
                            // damageTakenArtifactCollectedAudioPlayer.play();
                            break;
                    }

                    let shootAudio = process.env.PUBLIC_URL + "sounds/" + acheivedArtifact.audio;
                    var shootAudioPlayer = new Audio(shootAudio);
                    shootAudioPlayer.volume = 0.1;
                    shootAudioPlayer.play();
                    removeArtifact(gameId, acheivedArtifact.id);

                }

                console.log("future: ", tankFuturePosR, "-", tankFuturePosC)
                updatedTank = {
                    ...updatedTank, position: {
                        r: tankFuturePosR,
                        c: tankFuturePosC
                    },
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
                            uploadTank(gameId, {
                                ...updatedTank,
                                damageTaken: 0,
                                position: {
                                    r: player.locations.tank.r,
                                    c: player.locations.tank.c
                                },
                                bullet: getNewBullet()
                            })
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


    }

    function shootBullet() {

        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            const infrontPosition = getInfrontPostion(tank);
            const bullet = {
                ...tank.bullet,
                id: "b" + Math.ceil(Math.random() * 1000),
                ownerId: playerId,
                orientation: tank.orientation,
                position: {
                    r: infrontPosition.r,
                    c: infrontPosition.c,
                }
            };
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
        return <TankView
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