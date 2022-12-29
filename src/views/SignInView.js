function SignInView({ onSignInClicked, onPasswordChanged, onEmailChanged }) {
    return (<form>
        <div>Sign in</div>
        <input type="email" placeholder="Email" onChange={onEmailChanged}></input>
        <input type="password" placeholder="Password" onChange={onPasswordChanged}></input>
        <button type="submit" onClick={onSignInClicked}>Sign in</button>
        <div></div>
    </form>);
}

export default SignInView;