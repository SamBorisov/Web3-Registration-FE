import React from "react"

export default function Register(props) {


    //button animation
    const [mouseOv, setMouseOv] = React.useState(false)

    function chageColor() {
        setMouseOv(true)
    }
    function changeBack() {
        setMouseOv(false)
    }


    //send JSON data to the server 
    async function handleSubmit(event) {
        event.preventDefault()
        const object = {
            name: event.target.name.value,
            username: event.target.username.value,
            email: event.target.email.value,
            address: event.target.address.value,
        }

        await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })

    }


    return (

        <form onSubmit={handleSubmit} className="form">
            <input name="name" type="text" placeholder="Name" />
            <input name="username" type="text" placeholder="Username" />
            <input name="address" type="text" placeholder="Address" />
            <input name="email" type="email" placeholder="E-mail" />


            <button type="submit" style={{ backgroundColor: mouseOv ? "black" : "white" }}
                onMouseOver={chageColor}
                onMouseLeave={changeBack}>Register</button>

        </form>


    )
}