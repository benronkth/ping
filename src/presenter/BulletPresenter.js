import { useRecoilState } from "recoil";
import { blockSizeAtom, bulletsAtom, distructedsAtom, tanksAtom, targetsAtom, wallsAtom, boardColumnsCountAtom, boardRowsCountAtom, opponentTanksAtom, gameIdAtom, opponentBulletsAtom, opponentTargetsAtom, orientations, elementTypes, joinedPlayersAtom } from "../model/Game";
import BulletView from "../views/BulletView";
import { useEffect } from "react";
import { db, removeBullet, removeTank, removeTarget, removeWall, uploadBullet, uploadPlayer, uploadTank, uploadTarget, uploadWall } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";

function BulletPresenter() {
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [bullets, setBullets] = useRecoilState(bulletsAtom);
    const [boardRowsCount, setBoardRowsCount] = useRecoilState(boardRowsCountAtom);
    const [boardColumnsCount, setBoardColumnsCount] = useRecoilState(boardColumnsCountAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom);
    const [walls, setWalls] = useRecoilState(wallsAtom);
    const [tanks, setTanks] = useRecoilState(tanksAtom);
    const [targets, setTargets] = useRecoilState(targetsAtom);
    const [distructeds, setDistructeds] = useRecoilState(distructedsAtom);
    const [opponentTanks, setOpponentTanks] = useRecoilState(opponentTanksAtom);
    const [opponentBullets, setOpponentBullets] = useRecoilState(opponentBulletsAtom);
    const [opponentTargets, setOpponentTargets] = useRecoilState(opponentTargetsAtom);
    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);



    function getInfrontPostion(element) {

        let elementPosR = 0;
        let elementPosC = 0;
        switch (element.orientation) {
            case orientations.up:
                elementPosR = element.position.r - 1;
                elementPosC = element.position.c;
                break;

            case orientations.down:
                elementPosR = element.position.r + 1;
                elementPosC = element.position.c;
                break;

            case orientations.left:
                elementPosR = element.position.r;
                elementPosC = element.position.c - 1;
                break;
            case orientations.right:
                elementPosR = element.position.r;
                elementPosC = element.position.c + 1;
                break;
        }

        return {
            r: elementPosR,
            c: elementPosC,
        }
    }

    function getElement(row, column) {

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

    function moveBullet() {

        let distructedList = [];

        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];


            const infrontPosition = getInfrontPostion(bullet);

            if (infrontPosition.r < boardRowsCount && infrontPosition.r >= 0 && infrontPosition.c < boardColumnsCount && infrontPosition.c >= 0) {
                const elementInFrontOfBullet = getElement(infrontPosition.r, infrontPosition.c);
                const updatedBullet = {
                    ...bullet, position: {
                        r: infrontPosition.r,
                        c: infrontPosition.c
                    }
                };
                if (!elementInFrontOfBullet) {
                    if (bullet.position.r > -1 && bullet.position.r < boardRowsCount && bullet.position.c > -1 && bullet.position.c < boardColumnsCount) {
                        // move the bullet forward
                        uploadBullet(gameId, updatedBullet);
                    } else {
                        removeBullet(gameId, updatedBullet);
                    }
                } else {
                    if (elementInFrontOfBullet && elementInFrontOfBullet.distructable) {
                        // Decrease the health or Distruct the element if it is distructable   
                        let updatedElement = {
                            ...elementInFrontOfBullet,
                            name: elementInFrontOfBullet.maxHealth - elementInFrontOfBullet.damageTaken - bullet.attack,
                            damageTaken: elementInFrontOfBullet.damageTaken + bullet.attack
                        };

                        if (updatedElement.damageTaken > updatedElement.maxHealth) {
                            // destroy the element 
                            const distructedElement = {
                                name: "",
                                type: elementTypes.distructed,
                                id: "d" + Math.ceil(Math.random() * 1000),
                                blocked: false,
                                position: {
                                    r: infrontPosition.r,
                                    c: infrontPosition.c
                                }
                            }
                            distructedList.push(distructedElement);
                            // remove the element with space
                            removeElement(updatedElement);
                        } else {
                            replaceElement(elementInFrontOfBullet, updatedElement);
                        }
                    }

                    removeBullet(gameId, updatedBullet);
                }
            } else {
                removeBullet(gameId, bullet);
            }
        }
        setDistructeds(distructedList);
    }

    function removeElement(oldElement) {
        switch (oldElement.type) {
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

    function replaceElement(oldElement, newElement) {
        switch (oldElement.type) {
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
        if (bullets.length > 0) {
            refreshIntervalId = setTimeout(() => {
                console.log("ticking...");
                moveBullet();
            }, 50);
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
                let tempOpponentBullets = [];
                const fetchedBullets = Object.values(bullets);
                console.log("bullets are: ", fetchedBullets);
                for (let i = 0; i < fetchedBullets.length; i++) {
                    if (fetchedBullets[i].ownerId === playerId) {
                        tempBullets.push(fetchedBullets[i]);
                    } else {
                        tempOpponentBullets.push(fetchedBullets[i]);
                    }
                }
                setBullets(tempBullets);
                setOpponentBullets(tempOpponentBullets);
            } else {
                setBullets([]);
                setOpponentBullets([]);
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
        {opponentBullets.map(drawBullets)}</div>);
}

export default BulletPresenter;