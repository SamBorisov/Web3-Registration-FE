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

   //Get JSON data to the server on Get requrest!

    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");

    let token= localStorage.getItem('token');
    React.useEffect(() => {
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
            setName(data.name)
            setUsername(data.username)
            setEmail(data.email)
            setAddress(data.address)
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
              setName("")
              setUsername("")
              setEmail("")
              setAddress("")
            }   
            });
      
    }
   

    // clock
    const [time, setTime] = React.useState(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'))
  
    function rederTime() {
      const time2 = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      setTime(time2)
    }
    setInterval(rederTime, 60000);


    return(
  
      <div>

         <h3>Hello {name} <br></br>{time}</h3>
         { name === "" ? 
         <h4>To see your profile details, log in. <br></br> If you don't have an account, register!</h4>
         :
         <div>
         <h4>Here's your account information:</h4>
         <div style={{"textAlign":"left"}}>
         <p className="pdata"><b>Name:</b> {name}</p>
         <p className="pdata"><b>Username:</b> {username}</p>
         <p className="pdata"><b>E-mail:</b> {email}</p>
         <p className="pdata"><b>Blockchain address:</b> {address}</p>
      </div>

   
        <button style={{backgroundColor: mouseOv ? "#FF7377" : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
        onClick={handleLogOut}>LogOut
        </button>
        </div>
         }
       </div>




    )
}