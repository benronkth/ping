import CreateGamePresenter from "../presenter/CreateGamePresenter";
import JoinGamePresenter from "../presenter/JoinGamePresenter";
import NewlyCreatedGamesPresenter from "../presenter/NewlyCreatedGamesPresenter";

function LoggedInView() {
    return (<div className="flex-column" style={{ textAlign: "center", margin: "30px"}} >
        <div style={{ fontSize: "50px" }}>Create a game or join another game</div>
        <div className="loggedIn">
            <CreateGamePresenter></CreateGamePresenter>
            <JoinGamePresenter></JoinGamePresenter>
            <NewlyCreatedGamesPresenter></NewlyCreatedGamesPresenter>
        </div>
    </div>);
}

export default LoggedInView;