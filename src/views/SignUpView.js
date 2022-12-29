function SignUpView({ onNameChanged, onEmailChanged, onPasswordChanged, onSignUpClicked }) {
    return (<form>
        <div>Sign up</div>
        <input placeholder="Name" onChange={onNameChanged}></input>
        <input placeholder="Email" onChange={onEmailChanged}></input>
        <input placeholder="Password" onChange={onPasswordChanged}></input>
        <button type="submit" onClick={onSignUpClicked}>Sign Up</button>
        <div></div>
    </form>);
}

export default SignUpView;