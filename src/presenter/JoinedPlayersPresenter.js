import { useRecoilState } from "recoil";
import JoinedPlayersView from "../views/JoinedPlayersView";
import { gameIdAtom, gameOwnerIdAtom, joinedPlayersAtom } from "../model/Game";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import { useEffect } from "react";

function JoinedPlayersPresenter() {

    const [joinedPlayers, setJoinedPlayers] = useRecoilState(joinedPlayersAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const [gameOwnerId, setGameOwnerId] = useRecoilState(gameOwnerIdAtom);

    useEffect(() => {
        const playersRef = ref(db, 'games/' + gameId + "/players");
        const unsubscriber = onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            if (players) {
                const fetchedPlayers = Object.values(players);
                console.log("fetched players", fetchedPlayers);
                setJoinedPlayers(fetchedPlayers);
            }
        });

        return unsubscriber;
    }, []);

    return (<JoinedPlayersView gameOwnerId={gameOwnerId} players={joinedPlayers}></JoinedPlayersView>);
}

export default JoinedPlayersPresenter;