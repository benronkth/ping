import { useRecoilState } from "recoil";
import { blockSizeAtom, bulletsAtom, distructedsAtom, tanksAtom, targetsAtom, wallsAtom, boardColumnsCountAtom, boardRowsCountAtom, opponentTanksAtom, gameIdAtom, opponentTargetsAtom, orientations, elementTypes, joinedPlayersAtom, gameOwnerIdAtom, getInfrontPostion } from "../model/Game";
import BulletView from "../views/BulletView";
import { useEffect } from "react";
import { db, removeBullet, removeTank, removeTarget, removeWall, uploadBullet, uploadDistructeds, uploadPlayer, uploadTank, uploadTarget, uploadWall } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";
import { getNewBullet } from "../model/Elements";

function BulletPresenter() {
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [gameOwnerId, setGameOwnerId] = useRecoilState(gameOwnerIdAtom);
    const [bullets, setBullets] = useRecoilState(bulletsAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [walls, setWalls] = useRecoilState(wallsAtom);
    const [tanks, setTanks] = useRecoilState(tanksAtom);
    const [targets, setTargets] = useRecoilState(targetsAtom);
    const [opponentTanks, setOpponentTanks] = useRecoilState(opponentTanksAtom);
    // const [opponentBullets, setOpponentBullets] = useRecoilState(opponentBulletsAtom);
    const [opponentTargets, setOpponentTargets] = useRecoilState(opponentTargetsAtom);
    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);




    function getElements(row, column, allElements, bulletList) {

        let elements = [];

        // let foundInallElements = false;

        if (allElements) {
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i];
                if (element.position.r === row && element.position.c === column) {
                    elements.push({ index: i, value: element });
                    // foundInChangedItems = true;
                }
            }
        }

        if (bulletList) {
            for (let i = 0; i < bulletList.length; i++) {
                const element = bulletList[i];
                if (element.position) {
                    if (element.position.r === row && element.position.c === column) {
                        elements.push({ index: i, value: element });
                        // foundInChangedItems = true;
                    }
                }
            }
        }


        // if (!foundInChangedItems) {
        //     for (let i = 0; i < tanks.length; i++) {
        //         const tank = tanks[i];
        //         if (tank.position.r === row && tank.position.c === column) {
        //             elements.push(tank);
        //         }
        //     }
        //     for (let i = 0; i < opponentTanks.length; i++) {
        //         const opponentTank = opponentTanks[i];
        //         if (opponentTank.position.r === row && opponentTank.position.c === column) {
        //             elements.push(opponentTank);
        //         }
        //     }
        //     for (let i = 0; i < targets.length; i++) {
        //         const target = targets[i];
        //         if (target.position.r === row && target.position.c === column) {
        //             elements.push(target);
        //         }
        //     }
        //     for (let i = 0; i < opponentTargets.length; i++) {
        //         const opponentTarget = opponentTargets[i];
        //         if (opponentTarget.position.r === row && opponentTarget.position.c === column) {
        //             elements.push(opponentTarget);
        //         }
        //     }
        //     for (let i = 0; i < walls.length; i++) {
        //         const wall = walls[i];
        //         if (wall.position.r === row && wall.position.c === column) {
        //             elements.push(wall);
        //         }
        //     }

        // for (let i = 0; i < bullets.length; i++) {
        //     const bullet = bullets[i];
        //     if (bullet.position.r === row && bullet.position.c === column) {
        //         elements.push(bullet);
        //     }
        // }
        // }

        return elements;

    }



    function moveBullet() {

        let distructedList = [];
        let updatedElements = [];
        let bulletList = [...bullets];
        let allElements = [...walls, ...opponentTargets, ...targets, ...opponentTanks, ...tanks,] //make dictionary id:element


        let changedElements = {
            // id: { element:, status: } 
        };



        for (let i = 0; i < bulletList.length; i++) {
            let updatedBullet = bulletList[i];
            console.log(updatedBullet.speed);

            for (let s = 0; s < updatedBullet.speed; s++) {
                // console.log("running", s)
                // console.log("updated to ", updatedBullet)


                const theElementsOnTheSameLocation = getElements(updatedBullet.position.r, updatedBullet.position.c, allElements, bulletList);
                // console.log("elements on the same loc: ", theElementsOnTheSameLocation);

                for (let e = 0; e < theElementsOnTheSameLocation.length; e++) {

                    let elementOnTheSameLocation = theElementsOnTheSameLocation[e].value;
                    let elementOnTheSameLocationIndex = theElementsOnTheSameLocation[e].index;
                    if (elementOnTheSameLocation.ownerId === updatedBullet.ownerId) { continue; } //what about target? shouldn't bullet move pass target? 
                    if (elementOnTheSameLocation.damageTaken > elementOnTheSameLocation.maxHealth - 1) { continue; }; //element is already dead

                    // Decrease the health  
                    elementOnTheSameLocation = {
                        ...elementOnTheSameLocation,
                        damageTaken: elementOnTheSameLocation.damageTaken + updatedBullet.attack
                    };

                    if (elementOnTheSameLocation.damageTaken < elementOnTheSameLocation.maxHealth) {
                        // Element is still alive. replace it with the updated one.

                        if (elementOnTheSameLocation.type === elementTypes.bullet) {
                            bulletList[elementOnTheSameLocationIndex] = elementOnTheSameLocation;
                        } else {
                            allElements[elementOnTheSameLocationIndex] = elementOnTheSameLocation; 
                            let shootAudio = process.env.PUBLIC_URL + "sounds/" + elementOnTheSameLocation.hitAudio;
                            var shootAudioPlayer = new Audio(shootAudio);
                            shootAudioPlayer.volume = 0.05;
                            shootAudioPlayer.play();
                        }
                        changedElements[elementOnTheSameLocation.id] = {
                            element: elementOnTheSameLocation,
                            status: "alive"
                        }
                    } else {
                        // Element is dead. destroy the element (replace it with destructed element)
                        const distructedElement = {
                            name: "Boom",
                            type: elementTypes.distructed,
                            id: "d" + Math.ceil(Math.random() * 1000),
                            blocked: false,
                            position: {
                                r: updatedBullet.position.r,
                                c: updatedBullet.position.c
                            }
                        }
                        distructedList.push(distructedElement);

                        if (elementOnTheSameLocation.type === elementTypes.bullet) {
                            bulletList[elementOnTheSameLocationIndex] = elementOnTheSameLocationIndex;
                        } else {
                            allElements[elementOnTheSameLocationIndex] = elementOnTheSameLocation;

                            let shootAudio = process.env.PUBLIC_URL + "sounds/" + elementOnTheSameLocation.destroyAudio;
                            var shootAudioPlayer = new Audio(shootAudio);
                            shootAudioPlayer.volume = 0.05;
                            shootAudioPlayer.play();
                        }
                        changedElements[elementOnTheSameLocation.id] = {
                            element: elementOnTheSameLocation,
                            status: "dead"
                        }
                    }

                    // ----------------- current bullet --------------------------------------

                    updatedBullet = {
                        ...updatedBullet,
                        damageTaken: updatedBullet.damageTaken + elementOnTheSameLocation.attack,
                    }
                    const distructedElement = {
                        name: "Boom",
                        type: elementTypes.distructed,
                        id: "d" + Math.ceil(Math.random() * 1000),
                        blocked: false,
                        position: {
                            r: updatedBullet.position.r,
                            c: updatedBullet.position.c
                        }
                    }
                    distructedList.push(distructedElement);

                    // remove dead bullets
                    if (updatedBullet.damageTaken < updatedBullet.maxHealth) {
                        bulletList[i] = updatedBullet;
                        changedElements[updatedBullet.id] = {
                            element: updatedBullet,
                            status: "alive"
                        }
                    } else {
                        changedElements[updatedBullet.id] = {
                            element: updatedBullet,
                            status: "dead"
                        }
                        break; //get out of the all found elments loop
                    }


                }


                // remove dead bullets
                if (updatedBullet.damageTaken < updatedBullet.maxHealth) {
                    // bullet is still alive
                    changedElements[updatedBullet.id] = {
                        element: updatedBullet,
                        status: "alive"
                    }

                } else { // bullet is dead. destroy the bullet (replace it with destructed bullet)

                    console.log("damage taken else")

                    bulletList[i] = updatedBullet;
                    changedElements[updatedBullet.id] = {
                        element: updatedBullet,
                        status: "dead"
                    }
                    break; //get out of the speed loop
                }




                const infrontPosition = getInfrontPostion(updatedBullet);

                if (infrontPosition.r > boardRowsCount - 1 || infrontPosition.r < 0 || infrontPosition.c > boardColumnsCount - 1 || infrontPosition.c < 0) {
                    // infront position is a out of the board. 
                    // removedElements.push(updatedBullet);
                    changedElements[updatedBullet.id] = {
                        element: updatedBullet,
                        status: "dead"
                    }
                    break; //get out of the speed loop
                }

                updatedBullet = {
                    ...updatedBullet, position: {
                        r: infrontPosition.r,
                        c: infrontPosition.c
                    }
                };

                bulletList[i] = updatedBullet;
                changedElements[updatedBullet.id] = {
                    element: updatedBullet,
                    status: "alive"
                }

            }
        }

        const changedElementValues = Object.values(changedElements);
        for (let i = 0; i < changedElementValues.length; i++) {
            const element = changedElementValues[i];
            if (element.status === "alive") {
                updateElement(element.element);
            } else {
                removeElement(element.element);
            }

        }


        for (let i = 0; i < updatedElements.length; i++) {
            // const element = removedElements[i]; 
            updateElement(updatedElements[i]);
        }


        uploadDistructeds(gameId, distructedList);
    }

    function removeElement(oldElement) {
        switch (oldElement.type) {
            case elementTypes.bullet:
                removeBullet(gameId, oldElement);
                break;
            case elementTypes.wall:
                removeWall(gameId, oldElement);
                break;
            case elementTypes.target:
                removeTarget(gameId, oldElement);
                for (let i = 0; i < joinedPlayers.length; i++) {
                    const player = joinedPlayers[i];
                    if (player.id === oldElement.ownerId) {
                        uploadPlayer(gameId, {
                            ...player,
                            isAlive: false
                        });
                    }
                }
                break;
            case elementTypes.tank:
                removeTank(gameId, oldElement);
                for (let i = 0; i < joinedPlayers.length; i++) {
                    const player = joinedPlayers[i];
                    if (player.id === oldElement.ownerId) {
                        const tempDeathCount = player.deathCount + 1;
                        if (tempDeathCount < player.maxLivesCount) {
                            uploadPlayer(gameId, {
                                ...player,
                                deathCount: tempDeathCount,
                            });
                            uploadTank(gameId, {
                                ...oldElement,
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
                break;
        }
    }

    function updateElement(newElement) {
        switch (newElement.type) {
            case elementTypes.bullet:
                uploadBullet(gameId, newElement);
                break;
            case elementTypes.wall:
                uploadWall(gameId, newElement);
                break;
            case elementTypes.target:
                uploadTarget(gameId, newElement);
                break;
            case elementTypes.tank:
                uploadTank(gameId, newElement);
                break;
        }
    }



    useEffect(() => {
        var refreshIntervalId = null;

        if (gameOwnerId === playerId) {
            if (bullets.length > 0) {
                refreshIntervalId = setTimeout(() => {
                    console.log("ticking...");
                    moveBullet();
                }, 50);
            }
        }
        return () => {
            clearInterval(refreshIntervalId);
        }

    }, [bullets]);



    useEffect(() => {
        const bulletsRef = ref(db, 'games/' + gameId + "/bullets");
        return onValue(bulletsRef, (snapshot) => {
            const bullets = snapshot.val();
            if (bullets) {
                let tempBullets = [];
                // let tempOpponentBullets = [];
                const fetchedBullets = Object.values(bullets);
                // console.log("bullets are: ", fetchedBullets);
                for (let i = 0; i < fetchedBullets.length; i++) {
                    // if (fetchedBullets[i].ownerId === playerId) {
                    tempBullets.push(fetchedBullets[i]);
                    // } else {
                    //     tempOpponentBullets.push(fetchedBullets[i]);
                    // }
                }
                setBullets(tempBullets);
                // setOpponentBullets(tempOpponentBullets);
            } else {
                setBullets([]);
                // setOpponentBullets([]);
            }
        });
    }, []);

    function drawBullets(element) {
        console.log("drawing bullets");
        return <BulletView key={element.id}
            bullet={element}
            size={blockSize} 
        ></BulletView>;

    }


    return (<div>
        {bullets.map(drawBullets)}
        {/* {opponentBullets.map(drawBullets)} */}
    </div>);
}

export default BulletPresenter;