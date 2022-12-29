import { useRecoilState } from "recoil";
import { isPlayerLoggedInAtom, playerNameAtom } from "../model/User";
import ProfileView from "../views/ProfileView";
import { signOutUser } from "../firebase/firebase";

function ProfilePresenter() {

    const [playerName, setPlayerName] = useRecoilState(playerNameAtom);
    const [isPlayerLoggedIn, setIsPlayerLoggedIn] = useRecoilState(isPlayerLoggedInAtom);

    function onSignOutClicked() {
        function onSignOut() {
            console.log("user signed out");
            setIsPlayerLoggedIn(false);
        }
        signOutUser(onSignOut);

    }

    return (<ProfileView playerName={playerName}
        onSignOutClicked={onSignOutClicked}
    ></ProfileView>);
}

export default ProfilePresenter;