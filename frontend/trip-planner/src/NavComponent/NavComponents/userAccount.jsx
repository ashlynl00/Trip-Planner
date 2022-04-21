const UserAccount = () => {
    let parsedUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(parsedUser);
    console.log(parsedUser.username);
    return (
        <div>
            <h1>Hello {parsedUser.username}</h1>
            <button>Edit Account</button>
            <button>Delete Account</button>
        </div>
    )
}

export default UserAccount;