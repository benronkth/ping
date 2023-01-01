import JoinedPlayersPresenter from "../presenter/JoinedPlayersPresenter";

function FooterView({isGameCreated}) {
    return (<div className="footer"> 
        {isGameCreated ? <JoinedPlayersPresenter></JoinedPlayersPresenter> : <div></div>}
    </div> );
}

export default FooterView;