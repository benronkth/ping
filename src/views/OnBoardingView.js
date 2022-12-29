import SignInPresenter from "../presenter/SignInPresenter";
import SignUpPresenter from "../presenter/SignUpPresenter";

function OnBoardingView() {
    return (<div className="onBoardingHolder">
        <SignInPresenter></SignInPresenter>
        <SignUpPresenter></SignUpPresenter>
    </div> );
}

export default OnBoardingView;