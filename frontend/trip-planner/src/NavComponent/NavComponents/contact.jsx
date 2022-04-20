const Contact = () => {
    return (
        <div>
            <h1>Contact Us</h1>
            <form action="https://formsubmit.co/ashlyn@downing.us" method="POST">
                <label for='fname'>First Name: </label>
                <input type='text' name='fname' placeholder="first name"></input>
                <label for='lname'>Last Name: </label>
                <input type='text' name='lname' placeholder="last name"></input>
                <label for='email'>Email: </label>
                <input type='email' name='email' placeholder="email"></input>
                <label for='message'>Message: </label>
                <textarea type='text' name='message' placeholder="message"></textarea>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Contact;