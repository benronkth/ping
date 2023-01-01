import { useRecoilState } from "recoil";
import { isPlayerLoggedInAtom } from "../model/User";
import { isGameCreatedAtom } from "../model/Game";
import GameControlPresenter from "../presenter/GameControlPresenter";
import ProfilePresenter from "../presenter/ProfilePresenter";

function HeaderView() {
    const [isPlayerLoggedIn, setIsPlayerLoggedIn] = useRecoilState(isPlayerLoggedInAtom); 
    return (<div className="header">
        {isPlayerLoggedIn ? <ProfilePresenter></ProfilePresenter> : <div>Sign in first</div>}
    </div>);
}

export default HeaderView;