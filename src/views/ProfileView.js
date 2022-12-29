
function ProfileView({ playerName, onSignOutClicked }) {

    return (<div>
        <button onClick={onSignOutClicked}>Sign out {playerName}</button>
    </div>);
}

export default ProfileView;