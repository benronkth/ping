import { useRecoilState } from "recoil";
import NewlyCreatedGamesView from "../views/NewlyCreatedGamesView";
import { gameIdAtom, newlyCreatedGamesAtom } from "../model/Game";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import { useEffect } from "react";

function NewlyCreatedGamesPresenter() {

    const [newlyCreatedGames, setNewlyCreatedGames] = useRecoilState(newlyCreatedGamesAtom);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);

    function onGameIdClicked(event, game) {
        event.preventDefault();
        setGameId(game.id);
        document.getElementById("joinInputId").value = game.id;
    }
    
    useEffect(() => {
        // DO NOT REMOVE
        // updates the game id which is copied from the newly created games
        // console.log(""); 
    }, [gameId])

    useEffect(() => {
        const gamesRef = ref(db, 'games/');
        return onValue(gamesRef, (snapshot) => {
            const snapshotValue = snapshot.val();
            const games = Object.values(snapshotValue);
            if (games) {
                let tempGames = [];
                for (let i = 0; i < games.length; i++) {
                    const game = games[i];
                    tempGames.push({
                        id: game.gameId,
                        creationDate: game.creationDate ? Object.values(game.creationDate) : 0,
                        playersCount: game.players !== undefined ? Object.values(game.players).length : 0
                    });
                }
                setNewlyCreatedGames(tempGames);
            } else {
                setNewlyCreatedGames([]);
            }
        });
    }, []);

    return (<NewlyCreatedGamesView
        onGameIdClicked={onGameIdClicked}
        games={newlyCreatedGames}
    ></NewlyCreatedGamesView>);
}

export default NewlyCreatedGamesPresenter;