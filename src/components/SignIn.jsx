import { useState } from "react";

export default function SignIn() {

    async function handleClick(event) {
        event.preventDefault();

        //if token was set, login happens. token is only set when both form inputs are valid
        //using API authenticate
        try{
            //fetch API using GET request
            const fetchUser = await fetch("https://fakestoreapi.com/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password
                     })
                }
            );

            const response = await fetchUser.json();
            console.log("RESULT of sign in", response);
        }
        catch(error) {   
        }              
    }

    return (
    <>
        <h2> Sign In </h2>
        {/* conditionally render error/success message stored by their state variables */}
        {successMessage && <p>{successMessage}</p>}
        {newData && <p> Username: {newData} </p>}
        {/* {error && <p>Can't authenticate before signing up.{error}</p>} */}
        <button onClick={handleClick}> Sign In </button>
    </>
        )
}