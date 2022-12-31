import { useRecoilState } from "recoil";
import { gameIdAtom, gameOwnerIdAtom, isGameCreatedAtom, isGameFinishedAtom, isGameStartedAtom, tanksAtom, targetsAtom } from "../model/Game";
import GameControlView from "../views/GameControlView";
import { db, removeGame, removePlayer, removeTank, removeTarget, uploadIsGameFinished, uploadIsGameStarted } from "../firebase/firebase";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { playerIdAtom } from "../model/User";

function GameControlPresenter() {

    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [isGameStarted, setIsGameStarted] = useRecoilState(isGameStartedAtom);
    const [isGameCreated, setIsGameCreated] = useRecoilState(isGameCreatedAtom);
    const [gameOwnerId, setGameOwnerId] = useRecoilState(gameOwnerIdAtom);
    const [tanks, setTanks] = useRecoilState(tanksAtom);
    const [targets, setTargets] = useRecoilState(targetsAtom);
    const [isGameFinished, setIsGameFinished] = useRecoilState(isGameFinishedAtom);

    function onStartGameClicked() {
        console.log("Game is started");
        document.getElementById("gameIdButton").focus();
        // setIsGameStarted(true);
        uploadIsGameStarted(gameId, { isGameStarted: true });
    }

    function onExitGameClicked() {
        console.log("Game is exited");

        if (playerId === gameOwnerId) {
            removeGame(gameId);
        } else {
            for (let i = 0; i < tanks.length; i++) {
                const tank = tanks[i];
                removeTank(gameId, tank);
            }
            for (let i = 0; i < targets.length; i++) {
                const target = targets[i];
                removeTarget(gameId, target);
            }
            removePlayer(gameId, playerId);
            setIsGameStarted(false);
            setIsGameCreated(false);
            setIsGameFinished(true);
            setGameId(0);
        }
    }

    function onEndGameClicked() {
        console.log("Game is ended");

        if (playerId === gameOwnerId) { 
            uploadIsGameFinished(gameId, { isGameFinished: true });
            // removeGame(gameId);
        } else {
            for (let i = 0; i < tanks.length; i++) {
                const tank = tanks[i];
                removeTank(gameId, tank);
            }
            for (let i = 0; i < targets.length; i++) {
                const target = targets[i];
                removeTarget(gameId, target);
            }
            removePlayer(gameId, playerId); 
            setIsGameFinished(true);
        }
    }


    useEffect(() => {
        const gameRef = ref(db, 'games/' + gameId);
        const unsubscriber = onValue(gameRef, (snapshot) => {
            const game = snapshot.val();
            if (!game) {
                setGameId(0);
                setIsGameStarted(false);
                setIsGameCreated(false);
                setIsGameFinished(false);
            }
        });

        return unsubscriber;
    }, []);

    useEffect(() => {
        const gameOwnerRef = ref(db, 'games/' + gameId + "/gameOwnerId");
        const unsubscriber = onValue(gameOwnerRef, (snapshot) => {
            const gameOwnerId = snapshot.val();
            if (gameOwnerId) {
                setGameOwnerId(gameOwnerId);
            }
        });

        return unsubscriber;
    }, []);


    useEffect(() => {
        const isGameStartedRef = ref(db, 'games/' + gameId + "/isGameStarted");
        const unsubscriber = onValue(isGameStartedRef, (snapshot) => {
            const value = snapshot.val();
            if (value) {
                console.log("fetched is game STARTED->>>>>>>>>>>>>>> ", value, "-", Object.values(value)[0]);
                setIsGameStarted(Object.values(value)[0]);
            } else {
                setIsGameStarted(false);
            }
        });

        return unsubscriber;
    }, []);



    useEffect(() => {
        const reference = ref(db, 'games/' + gameId + "/isGameFinished");
        const unsubscriber = onValue(reference, (snapshot) => {
            const value = snapshot.val();
            console.log("fetched is game finished->>>>>>>>>>>>>>> ",value);
            if (value) {
                setIsGameFinished(Object.values(value)[0]);
            } else {
                setIsGameFinished(false);
            }
        });

        return unsubscriber;
    }, [isGameStarted]);

    return (<GameControlView
        gameId={gameId}
        onStartGameClicked={onStartGameClicked}
        isGameStarted={isGameStarted}
        isGameFinished={isGameFinished}
        onExitGameClicked={onExitGameClicked}
        onEndGameClicked={onEndGameClicked}
    ></GameControlView>);
}

export default GameControlPresenter;