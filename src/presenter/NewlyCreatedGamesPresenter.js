import { useRecoilState } from "recoil";
import NewlyCreatedGamesView from "../views/NewlyCreatedGamesView";
import { gameIdAtom, newlyCreatedGamesAtom } from "../model/Game";
import { onValue, ref } from "firebase/database";
import { db, removeGame } from "../firebase/firebase";
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
            if (snapshotValue) {
                const games = Object.values(snapshotValue);
                let tempGames = [];
                const days = 1;
                for (let i = 0; i < games.length; i++) {
                    const game = games[i];
                    if (game.creationDate && game.creationDate < (Date.now() - days * 24 * 60 * 60 * 1000)) {
                        removeGame(game.gameId);
                        break;
                    }
                    const tempGame = {
                        id: game.gameId,
                        creationDate: game.creationDate ? game.creationDate : 0,
                        playersCount: game.players ? Object.values(game.players).length : 0
                    };
                    tempGames.push(tempGame);
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