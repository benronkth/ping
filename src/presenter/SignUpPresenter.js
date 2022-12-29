import { useRecoilState } from "recoil";
import { signUpUser } from "../firebase/firebase";
import { isPlayerLoggedInAtom, playerEmailAtom, playerIdAtom, playerNameAtom, playerPasswordAtom } from "../model/User";
import SignUpView from "../views/SignUpView";

function SignUpPresenter() {
    const [playerName, setPlayerName] = useRecoilState(playerNameAtom);
    const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
    const [playerEmail, setPlayerEmail] = useRecoilState(playerEmailAtom);
    const [playerPassword, setPlayerPassword] = useRecoilState(playerPasswordAtom);
    const [isPlayerLoggedIn, setIsPlayerLoggedIn] = useRecoilState(isPlayerLoggedInAtom);

    function onSignUpClicked(event) {
        event.preventDefault();
        function onSignIn(user) {
            console.log(user);
            setPlayerName(user.displayName);
            setPlayerId(user.uid);
            setIsPlayerLoggedIn(true);
        }
        function onError(error) {
            console.log(error);
        }
        signUpUser(playerName, playerEmail, playerPassword, onSignIn, onError);

    }

    function onNameChanged(event) {
        console.log(event.target.value);
        setPlayerName(event.target.value);
    }
    function onEmailChanged(event) {
        console.log(event.target.value);
        setPlayerEmail(event.target.value);
    }
    function onPasswordChanged(event) {
        console.log(event.target.value);
        setPlayerPassword(event.target.value);
    }

    return (<SignUpView onNameChanged={onNameChanged}
        onEmailChanged={onEmailChanged}
        onPasswordChanged={onPasswordChanged}
        onSignUpClicked={onSignUpClicked}
    >

    </SignUpView>);
}

export default SignUpPresenter;