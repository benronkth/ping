import CreateGamePresenter from "../presenter/CreateGamePresenter";
import JoinGamePresenter from "../presenter/JoinGamePresenter";

function LoggedInView() {
    return (<div style = {{ textAlign: "center", margin: "30px" }} >
        <div style={{ fontSize: "40px" }}>Create a game or join another game</div>
        <div className="loggedIn">
            <CreateGamePresenter></CreateGamePresenter>
            <JoinGamePresenter></JoinGamePresenter>
        </div>
    </div>);
}

export default LoggedInView;