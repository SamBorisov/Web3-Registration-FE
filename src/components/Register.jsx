import React from "react"

export default function Register(props) {

    const [mouseOv, setMouseOv] = React.useState(false)

    function chageColor() {
        setMouseOv(true)
    }
    function changeBack() {
        setMouseOv(false)
    }

    const [data, setData] = React.useState({});


    async function handleSubmit(event) {
        event.preventDefault()
        const object = {
            name: event.target.name.value,
            username: event.target.username.value,
            email: event.target.email.value,
            address: event.target.address.value,
        }
        setData(object)

        const formData = new FormData();
        formData.append('1', JSON.stringify(object));

        fetch('http://localhost:3001/register', {
            method: 'POST',
            body: formData,
          });

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