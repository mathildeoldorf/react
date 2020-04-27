import React, { useState } from "react"
import "./login.css"



export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password)
        let connection = await fetch("http://localhost:9090/user/login")
        let data = await connection.json()
        console.log(data)
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <h2 className="formHeader">Login</h2>
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="E-mail" type="email" value={email} onChange={e=> setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="Password" type="password" value={password} onChange={e=> setPassword(e.target.value)}></input>
                <button disabled={!validateForm()} type="submit">Login</button>
            </form>
        </div>
    )
}