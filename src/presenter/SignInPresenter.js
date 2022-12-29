import { useRecoilState } from "recoil";
import SignInView from "../views/SignInView";
import { isPlayerLoggedInAtom, playerEmailAtom, playerIdAtom, playerNameAtom, playerPasswordAtom } from "../model/User";
import { signInUser } from "../firebase/firebaseConfig"; 

function SignInPresenter() {

    const [playerName, setPlayerName] = useRecoilState(playerNameAtom);
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [playerEmail, setPlayerEmail] = useRecoilState(playerEmailAtom);
    const [playerPassword, setPlayerPassword] = useRecoilState(playerPasswordAtom);
    const [isPlayerLoggedIn, setIsPlayerLoggedIn] = useRecoilState(isPlayerLoggedInAtom); 

    function onSignInClicked(event) {
        event.preventDefault();
        function onSignIn(user) {
            setPlayerName(user.displayName);
            setPlayerId(user.uid);
            setIsPlayerLoggedIn(true); 
            console.log(user);
        }
        function onError(error) {
            console.log(error);
        }
        signInUser(playerEmail, playerPassword, onSignIn, onError); 
    }

    function onEmailChanged(event) {
        console.log(event.target.value);
        setPlayerEmail(event.target.value);
    }
    function onPasswordChanged(event) {
        console.log(event.target.value);
        setPlayerPassword(event.target.value);
    }


    return (<SignInView onSignInClicked={onSignInClicked}
        onPasswordChanged={onPasswordChanged}
        onEmailChanged={onEmailChanged}
    ></SignInView>);
}

export default SignInPresenter;