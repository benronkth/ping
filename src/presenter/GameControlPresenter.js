import { useRecoilState } from "recoil";
import { gameIdAtom, gameOwnerAtom, gameOwnerIdAtom, isGameCreatedAtom, isGameStartedAtom, tanksAtom, targetsAtom } from "../model/Game";
import GameControlView from "../views/GameControlView";
import { db, removeGame, removePlayer, removeTank, removeTarget, uploadIsGameStarted } from "../firebase/firebaseConfig";
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
    function onStartGameClicked() {
        console.log("Game is started");
        // setIsGameStarted(true);
        uploadIsGameStarted(gameId, { isGameStarted: true });
    }

    function onExitGameClicked() {
        console.log("Game is exited");
        if (playerId == gameOwnerId) {
            removeGame(gameId)
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
        }
    }


    useEffect(() => {
        const gameRef = ref(db, 'games/' + gameId);
        const unsubscriber = onValue(gameRef, (snapshot) => {
            const game = snapshot.val();
            if (!game) {
                setIsGameStarted(false);
                setIsGameCreated(false);
            }
        });

        return unsubscriber;
    }, []);

    useEffect(() => {
        const gameOwnerRef = ref(db, 'games/' + gameId+"/gameOwnerId");
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
            setIsGameStarted(value);
        });

        return unsubscriber;
    }, []);

    return (<GameControlView
        gameId={gameId}
        onStartGameClicked={onStartGameClicked} 
        isGameStarted={isGameStarted}
        onExitGameClicked={onExitGameClicked}
    ></GameControlView>);
}

export default GameControlPresenter;