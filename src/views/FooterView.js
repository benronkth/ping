import JoinedPlayersPresenter from "../presenter/JoinedPlayersPresenter";

function FooterView({isGameCreated}) {
    return (<div className="footer"> 
        {isGameCreated ? <JoinedPlayersPresenter></JoinedPlayersPresenter> : <div>Create or join a game first</div>}
    </div> );
}

export default FooterView;