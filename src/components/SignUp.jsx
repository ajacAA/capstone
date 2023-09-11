import { useState } from "react"


//Sign up form component
export default function SignUp( {token, setToken} ) {
    //state variables for the form inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // error for API not functioning

    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");

    //async function
    async function handleSubmit(event) {
        event.preventDefault();

        //validating input 
        if(username.length < 5) {
            setUserError('Username must be atleast 5 characters long');
        }
        else {
            setUserError(null);
        }

        if(password.length < 6) {
            setPassError('Password must be atleast 6 characters long');
        }
        else {
            setPassError(null);
        }

        // only POST data after it has been validated - input error is null
        if(userError === null && passError === null) {
            //using the API
            try{
                const fetchData = await fetch("https://fakestoreapi.com/users", 
                    {
                    method: 'POST',
                    body: JSON.stringify({
                       username,
                       password
                    })
                    }
                );

                //parse to JSON object
                const result  = await fetchData.json();
                console.log("SIGN UP message", result);
            }
            catch(error){
                setError(error.message);
            }
            setUsername("");
            setPassword("");
        }
    }

    return (
    <>
        <h2> Sign Up</h2>
        {/* conditionally render error message stored by the error state variable */}
        {error && <p>{error}</p>}
        <form id="react-form-div" onSubmit={handleSubmit} >
            <label className="userNpass"> Username{" "} <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label><br/>
            <label className="userNpass"> Password{" "} <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label><br/><br/>
            <button className="react-form-submit-button" >Sign Up</button> <br/>
        </form>
        {userError} <br/> {passError}
    </>
    )
}