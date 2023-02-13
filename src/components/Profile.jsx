import React, {useState, useEffect} from "react";
import Button from "../helpers/Button";


export default function Profile() {


   //Get JSON data to the server on Get requrest!
    const [data, setData] = useState({});

    let token= localStorage.getItem('token');
    useEffect(() => {
      function fetchData() {
        fetch("http://localhost:4000/profile", {
          mode:'cors',
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            }
          })
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            console.log(data)
          });
      }
    fetchData()
    }, [token]);

    function handleLogOut() {

        fetch("http://localhost:4000/logout", {
          mode:'cors',
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }).then(response => {
            if (response.ok) {
              localStorage.removeItem("token");
              setData({})
            }   
            });
      
    }
   

    // clock
    const [time, setTime] = useState(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'))
  
    function rederTime() {
      const time2 = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      setTime(time2)
    }
    setInterval(rederTime, 60000);


    return(
  
      <div>

         <h3>Hello {data.name} <br></br>{time}</h3>
         { Object.keys(data).length === 0 ? 
         <h4>To see your profile details, log in. <br></br> If you don't have an account, register!</h4>
         :
         <div>
         <h4>Here's your account information:</h4>
         <div style={{"textAlign":"left"}}>
         <p className="pdata"><b>Name:</b> {data.name}</p>
         <p className="pdata"><b>Username:</b> {data.username}</p>
         <p className="pdata"><b>E-mail:</b> {data.email}</p>
         <p className="pdata"><b>Blockchain address:</b> {data.address}</p>
      </div>
        <Button func={handleLogOut} text="LogOut" color="#ffa07a"/>
        </div>
         }
       </div>




    )
}