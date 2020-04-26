import React, { useState, useEffect } from "react"

export default function Login(){
    const [input, setValue] = useState("")
    const [email, setEmail] = useState("a@a.com")

    const handleInput = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }

    const handleUpdateEmail = (event) => {
        event.preventDefault()
        setEmail(input)
        setValue("") // RESET VALUE OF THE INPUT
    }

    return (
    <div>
    <p>Hello {email}</p>
    <form>
        <input type="text" placeholder="Email" value={input} onChange={handleInput}></input>
        {/* <input type="text" placeholder="Password" value={input} onChange={handleInput}></input> */}
        <button onClick={handleUpdateEmail}></button>
    </form>
    </div>
    )
}