import React, { useState, useEffect } from 'react';

export default function Login() {

        // return(
        //     <p>logging in</p>
        // );
   

    const [user, password, loginUser] = useState(0);

    const handleInputChange = (event) => {
        // this.setState({[event.target.id]: event.target.value});
        console.log('hello');
        console.log(event.target.id, event.target.value);

    }

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You are logged in as ${user}`;
    });

    return (
        <div>
            <form>
                <h1>Form</h1>
                <input type="text" id="username" placeholder="First name" onChange={() => handleInputChange} />
                <input type="text" id="password" placeholder="Last name" onChange={() => handleInputChange} />
                <button type="submit" onClick={() => onFormSubmit}>Submit</button>
            </form>
        <p>You are logged in as {user}</p>
        <button onClick={() => loginUser(user + 1)}>
            Click me
        </button>
        </div>
    );
}