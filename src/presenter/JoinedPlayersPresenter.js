import { useRecoilState } from "recoil";
import JoinedPlayersView from "../views/JoinedPlayersView";
import { acheivedArtifactsAtom, gameIdAtom, gameLosersAtom, gameOwnerIdAtom, gameWinnersAtom, isGameFinishedAtom, isGameStartedAtom, joinedPlayersAtom } from "../model/Game";
import { onValue, ref } from "firebase/database";
import { db, uploadIsGameFinished } from "../firebase/firebase";
import { useEffect } from "react";

function JoinedPlayersPresenter() {

    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [gameOwnerId, setGameOwnerId] = useRecoilState(gameOwnerIdAtom);
    const [isGameStarted, setIsGameStarted] = useRecoilState(isGameStartedAtom);
    const [gameWinners, setGameWinners] = useRecoilState(gameWinnersAtom);
    const [gameLosers, setGameLosers] = useRecoilState(gameLosersAtom);


    useEffect(() => {
        const playersRef = ref(db, 'games/' + gameId + "/players");
        const unsubscriber = onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            if (players) {
                const fetchedPlayers = Object.values(players);
                console.log("fetched players", fetchedPlayers);
                let alivePlayers = []
                let deadPlayers = []
                // check if there is only one player alive -> the player is the winner
                for (let i = 0; i < fetchedPlayers.length; i++) {
                    const player = fetchedPlayers[i];
                    if (player.isAlive) {
                        alivePlayers.push(player);
                    } else {
                        deadPlayers.push(player);
                    }
                }
                console.log("is game started", isGameStarted);
                console.log("alive, ", alivePlayers.length, "->", alivePlayers);
                console.log("dead, ", deadPlayers);
                if (isGameStarted) {
                    if (alivePlayers.length < 2) {
                        console.log("GAME IS FINISHED because one player is alive");
                        uploadIsGameFinished(gameId, { isGameFinished: true });
                    }
                }
                setGameWinners(alivePlayers);
                setGameLosers(deadPlayers);


                setJoinedPlayers(fetchedPlayers);
            }
        });

        return unsubscriber;
    }, [isGameStarted]);

    return (<JoinedPlayersView gameOwnerId={gameOwnerId} players={joinedPlayers}></JoinedPlayersView>);
}

export default JoinedPlayersPresenter;