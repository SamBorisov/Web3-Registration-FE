import React from "react"

export default function Login(props) {

    //button styles
    const [mouseOv, setMouseOv] = React.useState(false)

    function chageColor() {
        setMouseOv(true)
       }
    function changeBack(){
        setMouseOv(false)
       }

    //send JSON data to the server 
    async function handleSubmit(event) {
        event.preventDefault()
        const object = {
            username: event.target.username.value,
            address: event.target.address.value
        }

        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })

    }


    return(

    <form onSubmit={handleSubmit} className="form">

        <input name="username" type="text" placeholder="Username" />
        <input name="address" type="text" placeholder="Address" />
        
  
        <button type="submit" style={{backgroundColor: mouseOv ? "black" : "white"}} 
        onMouseOver={chageColor}  
        onMouseLeave={changeBack}>Login</button>

      </form>


    )
}