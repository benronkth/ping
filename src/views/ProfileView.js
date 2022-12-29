import { useRecoilState } from "recoil";
import { playerNameAtom } from "../model/User";

function ProfileView({ playerName, onSignOutClicked }) {

    return (<div>
        <button onClick={onSignOutClicked}>Sign out {playerName}</button>
    </div>);
}

export default ProfileView;