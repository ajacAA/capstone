import { useEffect, useState } from "react";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";
import { useNavigate, useParams } from 'react-router-dom';

export default function SignIn( {token, setToken}) {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
//set local storage to store toke


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
                        username: username,
                        password: password
                     })
                }
            );

            const response = await fetchUser.json();
            setToken(response.token);
            //save jwt in storage
            localStorage.setItem('token', response.token);
            console.log("RESULT of sign in TOKEN: ", response.token);
            
        }
        catch(error) { 
            if(!token) {
                console.log("TOKEN IN CATCH ERROR", token);
                console.log("USER NOT FOUND");
            }  

        }  
        
        if (!localStorage.getItem("token")) {           
            alert("INVALID LOGIN INFO")
        }
        else {
            //Navigate to products and user logged in.
            console.log("TOKEN INSIDE FUNCTION: ", token);
            console.log("LOCAL STORAGE TOKEN: ", localStorage.getItem("token"));
            tokenIsPresent(`/products/`);
        }
    }

    return (
        <div className="sign-in-page">
            <h2> Sign In </h2>

            <form className="sign-in-form" onSubmit={handleClick}>
                <label>
                    Username{" "} <input type="text" value={username} onChange={(e) => setUsername( e.target.value)} />
                </label><br/>

                <label > 
                    Password {" "} <input type="password" value={password} onChange={(e) => setPassword( e.target.value )} />
                </label><br/>

                <button onClick={handleClick}> Sign In </button>
            </form>
        </div>
    )
}