import React from "react";


export default function Profile(props) {

    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
      fetch("http://localhost:3001/")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);


    let isRegistred = false;

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