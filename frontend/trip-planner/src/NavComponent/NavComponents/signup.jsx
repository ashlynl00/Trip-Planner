const SignUp = () => {
    return (
        <div>
            <h1>Sign Up</h1>
            <form>
                <label for='username'>Username: </label>
                <input type='text' name='username' placeholder="username"></input>
                <label for='password'>Password: </label>
                <input type='text' name='password' placeholder="password"></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignUp;