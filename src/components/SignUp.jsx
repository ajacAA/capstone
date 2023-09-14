import { useEffect, useState } from "react"
import { Link, useFetcher } from "react-router-dom";


//Sign up form component
export default function SignUp( {token, setToken} ) {
    //state variables for the form inputs
    const [name, setName] = useState("");
    const [nameIsValid, setNameIsValid] = useState(false);

    const [userEmail, setUserEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const [passwordMatch, setPasswordMatch] = useState("");
    const [matchIsValid, setMatchIsValid] = useState(false);

    //error message and successful submission of the form
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);


    //Validation for name
    useEffect(() => {
        //name is valid, set it to true
        setNameIsValid(true);
    }, [])


    //Validation for the password matching
    useEffect(() => {

        //set valid if the password has been tested to be correct
        setPasswordIsValid(true);
        //password and confirm password states match, set it to true
        setMatchIsValid(password === passwordMatch);
    }, [password, passwordMatch])


    //Display error message 
    useEffect(() => {
        setErrorMessage("");
    }, [userEmail, password, passwordMatch]);

    //async function
    async function handleSubmit(event) {
        event.preventDefault();

        //validating input 
        if(userEmail.length < 5) {
            setEmailIsValid('Username must be atleast 5 characters long');
        }
        else {
            setErrorMessage(null);
        }

        if(password.length < 6) {
            setPasswordIsValid('Password must be atleast 6 characters long');
        }
        else {
            setErrorMessage(null);
        }

        // only POST data after it has been validated - input error is null
        if(userEmail === null && passError === null) {
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
        <h2> Create your account </h2>

        <form id="sign-up-form" onSubmit={handleSubmit} >
            <label className="userNpass"> Name{" "} <br/> <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label><br/>
            <label className="userNpass"> Email{" "} <br/> <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            </label><br/>
            <label className="userNpass"> Password{" "} <br/> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label><br/><br/>
            <label className="userNpass"> Confirm Password{" "} <br/> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label><br/><br/>
            <button className="sign-up-submit-button" >Sign Up</button> <br/>
            <p> Have an account? <Link> Sign In </Link></p>
        </form>
    </>
    )
}