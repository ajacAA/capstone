import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function SignIn({token, setToken}) {

const [user, setUser] = useState({
    username: "", password: ""
});

const tokenIsPresent = useNavigate();

    async function handleClick(event) {
        event.preventDefault();

        //if token was set, login happens. token is only set when both form inputs are valid
        //using API authenticate
        try{
            //get all users

            // fetch('https://fakestoreapi.com/users')
            // .then(res=>res.json())
            // .then(json=>console.log(json))

            
            //fetch API using GET request
            const fetchUser = await fetch("https://fakestoreapi.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        username: user.username,
                        password: user.password
                     })
                }
            );

            const response = await fetchUser.json();
            setToken(response.token);
            console.log("RESULT of sign in", response);
        }
        catch(error) {   
            console.log("USER NOT FOUND");
        }  
        
        if (token) {
            () => tokenIsPresent(`/products/`)
        }
        else {
            alert("INVALID LOGIN INFO")
        }
    }

    return (
    <>
        <h2> Sign In </h2>

        <form className="sign-in-form" onSubmit={handleClick}>
            <label>
                Username{" "} <input type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
            </label><br/>

            <label > 
                Password {" "} <input type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
            </label><br/>

            <button onClick={handleClick}> Sign In </button>
        </form>



    </>
        )
}