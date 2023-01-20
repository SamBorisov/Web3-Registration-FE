import React from "react"

export default function Login(props) {

    const [mouseOv, setMouseOv] = React.useState(false)

    function chageColor() {
        setMouseOv(true)
       }
    function changeBack(){
        setMouseOv(false)
       }

    return(

        <form className="form">
        <input name="name" type="text" placeholder="Name" />
        <input name="username" type="text" placeholder="Username" />
        



  
        <button type="submit" style={{backgroundColor: mouseOv ? "black" : "white"}} 
        onMouseOver={chageColor}  
        onMouseLeave={changeBack}>Login</button>

      </form>


    )
}