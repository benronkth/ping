import { useRecoilState } from "recoil";
import { blockSizeAtom, bulletsAtom, distructedsAtom, tanksAtom, targetsAtom, wallsAtom, boardColumnsCountAtom, boardRowsCountAtom, opponentTanksAtom, gameIdAtom, opponentTargetsAtom, orientations, elementTypes, joinedPlayersAtom, gameOwnerIdAtom, getInfrontPostion } from "../model/Game";
import BulletView from "../views/BulletView";
import { useEffect } from "react";
import { db, removeBullet, removeTank, removeTarget, removeWall, uploadBullet, uploadPlayer, uploadTank, uploadTarget, uploadWall } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";

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
    const [distructeds, setDistructeds] = useRecoilState(distructedsAtom);
    const [opponentTanks, setOpponentTanks] = useRecoilState(opponentTanksAtom);
    // const [opponentBullets, setOpponentBullets] = useRecoilState(opponentBulletsAtom);
    const [opponentTargets, setOpponentTargets] = useRecoilState(opponentTargetsAtom);
    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);




    function getElements(row, column) {

        let elements = [];
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            if (bullet.position.r === row && bullet.position.c === column) {
                elements.push(bullet);
            }
        }

        for (let i = 0; i < tanks.length; i++) {
            const tank = tanks[i];
            if (tank.position.r === row && tank.position.c === column) {
                elements.push(tank);
            }
        }
        for (let i = 0; i < opponentTanks.length; i++) {
            const opponentTank = opponentTanks[i];
            if (opponentTank.position.r === row && opponentTank.position.c === column) {
                elements.push(opponentTank);
            }
        }
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            if (target.position.r === row && target.position.c === column) {
                elements.push(target);
            }
        }
        for (let i = 0; i < opponentTargets.length; i++) {
            const opponentTarget = opponentTargets[i];
            if (opponentTarget.position.r === row && opponentTarget.position.c === column) {
                elements.push(opponentTarget);
            }
        }
        for (let i = 0; i < walls.length; i++) {
            const wall = walls[i];
            if (wall.position.r === row && wall.position.c === column) {
                elements.push(wall);
            }
        }

        return elements;

    }



    function moveBullet() {

        let distructedList = [];
        let removedElements = [];
        let updatedElements = [];
        let bulletList = [...bullets];

        function findBulletIndex(bullet) {
            for (let i = 0; i < bulletList.length; i++) {
                const element = bulletList[i];
                if (element.id === bullet.id) {
                    return i;
                }

            }
        }

        for (let i = 0; i < bulletList.length; i++) {
            const bullet = bullets[i];
            console.log(bullet.speed);


            let updatedBullet = { ...bullet };

            for (let s = 0; s < updatedBullet.speed; s++) {
                console.log("running", s)
                console.log("updated to ", updatedBullet)


                const theElementsOnTheSameLocation = getElements(updatedBullet.position.r, updatedBullet.position.c);
                console.log("elements on the same loc: ", theElementsOnTheSameLocation);

                for (let e = 0; e < theElementsOnTheSameLocation.length; e++) {

                    let elementOnTheSameLocation = theElementsOnTheSameLocation[e];
                    if (elementOnTheSameLocation.ownerId === updatedBullet.ownerId) { continue; }

                    // Decrease the health  
                    elementOnTheSameLocation = {
                        ...elementOnTheSameLocation,
                        name: elementOnTheSameLocation.maxHealth - elementOnTheSameLocation.damageTaken - updatedBullet.attack,
                        damageTaken: elementOnTheSameLocation.damageTaken + updatedBullet.attack
                    };

                    if (elementOnTheSameLocation.damageTaken < elementOnTheSameLocation.maxHealth) {
                        // Element is still alive. replace it with the updated one.
                        // updateElement(elementOnTheSameLocation);
                        if (elementOnTheSameLocation.type === elementTypes.bullet) {
                            bulletList[findBulletIndex(elementOnTheSameLocation)] = elementOnTheSameLocation;

                        } else {
                            updatedElements.push(elementOnTheSameLocation);
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
                        // remove the element
                        // removeElement(elementOnTheSameLocation);
                        removedElements.push(elementOnTheSameLocation);
                    }

                    updatedBullet = {
                        ...updatedBullet,
                        damageTaken: updatedBullet.damageTaken + elementOnTheSameLocation.attack,
                    }

                    // remove dead bullets
                    if (updatedBullet.damageTaken > updatedBullet.maxHealth - 1) {
                        break; //get out of the speed loop
                    }


                }


                // remove dead bullets
                if (updatedBullet.damageTaken < updatedBullet.maxHealth) {
                    // if (s === updatedBullet.speed - 1) {
                    //     updatedElements.push(updatedBullet);
                    // }
                } else { // bullet is dead. destroy the bullet (replace it with destructed bullet)

                    console.log("damage taken else")
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
                    // removeElement(updatedBullet);
                    removedElements.push(updatedBullet);
                    break; //get out of the speed loop
                }




                const infrontPosition = getInfrontPostion(updatedBullet);

                if (infrontPosition.r > boardRowsCount - 1 || infrontPosition.r < 0 || infrontPosition.c > boardColumnsCount - 1 || infrontPosition.c < 0) {
                    // infront position is a out of the board. 
                    // removeElement(bullet);
                    removedElements.push(updatedBullet);
                    continue;
                }

                updatedBullet = {
                    ...updatedBullet, position: {
                        r: infrontPosition.r,
                        c: infrontPosition.c
                    }
                };

                bulletList[i] = updatedBullet;

                if (s === updatedBullet.speed - 1) {
                    updatedElements.push(updatedBullet);
                }



                // const elementInFrontOfBullet = getElement(infrontPosition.r, infrontPosition.c);


                // if (!elementInFrontOfBullet) {
                //     // Element infront is undifined => space
                //     // We check if the element after the space is an enemy bullet 
                //     updatedBullet = {
                //         ...updatedBullet, position: {
                //             r: infrontPosition.r,
                //             c: infrontPosition.c
                //         }
                //     };
                //     const twoStepInfrontPosition = getInfrontPostion(updatedBullet);
                //     const elementTwoStepInFrontOfBullet = getElement(twoStepInfrontPosition.r, twoStepInfrontPosition.c);
                //     if (elementTwoStepInFrontOfBullet
                //         && elementTwoStepInFrontOfBullet.type === elementTypes.bullet
                //         && elementTwoStepInFrontOfBullet.orientation !== updatedBullet.orientation) {
                //         // this is the enemy bullet. Decrease both bullets health.

                //         let updatedEnemyBullet = {
                //             ...elementTwoStepInFrontOfBullet,
                //             name: elementTwoStepInFrontOfBullet.maxHealth - elementTwoStepInFrontOfBullet.damageTaken - updatedBullet.attack,
                //             damageTaken: elementTwoStepInFrontOfBullet.damageTaken + updatedBullet.attack
                //         };

                //         if (updatedEnemyBullet.damageTaken < updatedEnemyBullet.maxHealth) {
                //             // Bullet is still alive. replace it with the updated one.
                //             // updateElement(updatedEnemyBullet);
                //             updatedElements.push(updatedEnemyBullet);
                //         } else {
                // Bullet is dead. destroy the element (replace it with destructed element)
                //     const distructedElement = {
                //         name: "Boom",
                //         type: elementTypes.distructed,
                //         id: "d" + Math.ceil(Math.random() * 1000),
                //         blocked: false,
                //         position: {
                //             r: twoStepInfrontPosition.r,
                //             c: twoStepInfrontPosition.c
                //         }
                //     }
                //     distructedList.push(distructedElement);
                //     // remove the element
                //     // removeElement(updatedEnemyBullet);
                //     removedElements.push(updatedEnemyBullet);
                // }

                // updatedBullet = {
                //     ...updatedBullet,
                //     name: updatedBullet.maxHealth - updatedBullet.damageTaken - updatedEnemyBullet.attack,
                //     damageTaken: updatedBullet.damageTaken + updatedEnemyBullet.attack,
                // }

                // console.log("updated bullet is: ", updatedBullet);


                // // remove dead bullets
                // if (updatedBullet.damageTaken < updatedBullet.maxHealth) {
                //     // uploadBullet(gameId, updatedBullet);
                //     // updateElement(updatedBullet);
                //     if (s === updatedBullet.speed - 1) {
                //         updatedElements.push(updatedBullet);
                //     }
                //         } else { // Element is dead. destroy the element (replace it with destructed element)
                //             const distructedElement = {
                //                 name: "Boom",
                //                 type: elementTypes.distructed,
                //                 id: "d" + Math.ceil(Math.random() * 1000),
                //                 blocked: false,
                //                 position: {
                //                     r: infrontPosition.r,
                //                     c: infrontPosition.c
                //                 }
                //             }
                //             distructedList.push(distructedElement);
                //             // removeElement(updatedBullet);
                //             removedElements.push(updatedBullet);
                //             break; //get out of the speed loop
                //         }

                //         continue;

                //     }
                // }


                // if (!elementInFrontOfBullet  // Element infront is undifined => space
                //     || (elementInFrontOfBullet // Element infront is defined but it is a friendly bullet 
                //         && (elementInFrontOfBullet.type === elementTypes.bullet)
                //         && (elementInFrontOfBullet.orientation === updatedBullet.orientation))) {
                //     // Element infront is undifined => space
                //     updatedBullet = {
                //         ...updatedBullet, position: {
                //             r: infrontPosition.r,
                //             c: infrontPosition.c
                //         }
                //     };
                //     if (s === updatedBullet.speed - 1) {
                //         updatedElements.push(updatedBullet);
                //     }
                //     // uploadBullet(gameId, updatedBullet);

                // } else {
                //     // Element infront is defined 
                //     // Decrease the health  
                //     let updatedElementInFrontOfBullet = {
                //         ...elementInFrontOfBullet,
                //         name: elementInFrontOfBullet.maxHealth - elementInFrontOfBullet.damageTaken - updatedBullet.attack,
                //         damageTaken: elementInFrontOfBullet.damageTaken + bullet.attack
                //     };

                //     if (updatedElementInFrontOfBullet.damageTaken < updatedElementInFrontOfBullet.maxHealth) {
                //         // Element is still alive. replace it with the updated one.
                //         // updateElement(updatedElementInFrontOfBullet);
                //         updatedElements.push(updatedElementInFrontOfBullet);
                //     } else {
                //         // Element is dead. destroy the element (replace it with destructed element)
                //         const distructedElement = {
                //             name: "Boom",
                //             type: elementTypes.distructed,
                //             id: "d" + Math.ceil(Math.random() * 1000),
                //             blocked: false,
                //             position: {
                //             r: infrontPosition.r,
                //             c: infrontPosition.c
                //         }
                //     }
                //     distructedList.push(distructedElement);
                //     // remove the element
                //     // removeElement(updatedElementInFrontOfBullet);
                //     removedElements.push(updatedElementInFrontOfBullet);
                // }

                // updatedBullet = {
                //     ...updatedBullet,
                //     name: updatedBullet.maxHealth - updatedBullet.damageTaken - elementInFrontOfBullet.attack,
                //     damageTaken: updatedBullet.damageTaken + elementInFrontOfBullet.attack,
                //     position: {
                //         r: infrontPosition.r,
                //         c: infrontPosition.c
                //     }
                // }

                // console.log("updated bullet is: ", updatedBullet);


                // // remove dead bullets
                // if (updatedBullet.damageTaken < updatedBullet.maxHealth) {
                //     // uploadBullet(gameId, updatedBullet);
                //     // updateElement(updatedBullet);
                //     if (s === updatedBullet.speed - 1) {
                //         updatedElements.push(updatedBullet);
                //     }
                // } else { // Element is dead. destroy the element (replace it with destructed element)
                //     const distructedElement = {
                //             name: "Boom",
                //             type: elementTypes.distructed,
                //             id: "d" + Math.ceil(Math.random() * 1000),
                //             blocked: false,
                //             position: {
                //                 r: infrontPosition.r,
                //                 c: infrontPosition.c
                //             }
                //         }
                //         distructedList.push(distructedElement);
                //         // removeElement(updatedBullet);
                //         removedElements.push(updatedBullet);
                //         break; //get out of the speed loop
                //     }


                // }

            }
        }

        // console.log("removed elements: ", removedElements);
        // console.log("updated elements: ", updatedElements);

        // const updatedBullets = updatedElements.filter((e) => e.type === elementTypes.bullet);

        // for (let i = 0; i < updatedBullets.length; i++) {
        //     for (let j = 0; j < updatedBullets.length; j++) {
        //         const bullet1 = updatedBullets[i];
        //         const bullet2 = updatedBullets[j]; 
        //         if (bullet1.position.r === bullet2.position.r && bullet1.position.c === bullet2.position.c) {

        //         }
        //     }
        // }

        for (let i = 0; i < removedElements.length; i++) {
            // const element = removedElements[i];
            removeElement(removedElements[i]);
        }


        for (let i = 0; i < updatedElements.length; i++) {
            // const element = removedElements[i]; 
            updateElement(updatedElements[i]);
        }


        setDistructeds(distructedList);
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
                                }
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
                }, 500);
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
            position={element.position}
            size={blockSize}
            name={element.name}
            id={element.id}
            orientation={element.orientation}
        > ({element.r}) </BulletView>;

    }


    return (<div>
        {bullets.map(drawBullets)}
        {/* {opponentBullets.map(drawBullets)} */}
    </div>);
}

export default BulletPresenter;