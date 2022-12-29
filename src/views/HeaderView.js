import { useRecoilState } from "recoil";
import { isPlayerLoggedInAtom } from "../model/User";
import { isGameCreatedAtom } from "../model/Game";
import GameControlPresenter from "../presenter/GameControlPresenter";
import ProfilePresenter from "../presenter/ProfilePresenter";
import JoinedPlayersPresenter from "../presenter/JoinedPlayersPresenter";

function HeaderView() {
    const [isGameCreated, setIsGameCreated] = useRecoilState(isGameCreatedAtom); 
    const [isPlayerLoggedIn, setIsPlayerLoggedIn] = useRecoilState(isPlayerLoggedInAtom); 
    return (<div className="header">
        {isPlayerLoggedIn ? <ProfilePresenter></ProfilePresenter> : <div>Sign in first</div>}
        {isGameCreated ? <GameControlPresenter></GameControlPresenter> : <div>Create or join a game first</div>}
    </div>);
}

export default HeaderView;