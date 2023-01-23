import React from "react";


export default function Profile(props) {

   //button styles
   const [mouseOv, setMouseOv] = React.useState(false)

   function chageColor() {
       setMouseOv(true)
      }
   function changeBack(){
       setMouseOv(false)
      }

   //send JSON data to the server 
 
   async function handleClick(event) {

       await fetch('http://localhost:4000/logout', {
           method: 'GET',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           }
       })

   }
    const [message, setMessage] = React.useState("");

    let isRegistred = false;

    React.useEffect(() => {
      fetch("http://localhost:4000/")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);


   

    // clock
    const [time, setTime] = React.useState(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'))
  
    function rederTime() {
      const time2 = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      setTime(time2)
    }
    setInterval(rederTime, 60000);


    return(
    <div className="note">


        <h1>{time}</h1>

        {isRegistred ? 
        <div>

         <h2>Your address</h2>
         <p>spesification on your profile</p>

         <button type="submit" style={{backgroundColor: mouseOv ? "black" : "white"}} 
        onMouseOver={chageColor}  
        onMouseLeave={changeBack}
        onClick={handleClick}>LogOut</button>

        </div>
        :
        <div>
            <h1>{message}</h1>

        <p>To see your profile please register! <br></br> If you already have an account, log in!</p>

       </div>
    }

    </div>

    )
}