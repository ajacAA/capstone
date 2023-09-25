import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { ApplicationCartContext } from "../API/ApplicationCartContext";

//Set Up Account Form 
export default function NewAccount() {
    const [error, setError] = useState(null);

   //FORM AT ITS START STATE
    const [accountForm, setAccountForm] = useState({
        email: "", username: "", password: "", name: {firstname: "", lastname: ""},
        address:{
            city: "",
            street: "",
            number: "",
            zipcode: ""
        }, phone: ""});


    //async function
    async function handleSubmit(event) {
        event.preventDefault();
        console.log("New Account: ", accountForm);

            try {
                //response from the API
                const response = await fetch(`https://fakestoreapi.com/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        email: accountForm.email,
                        username: accountForm.username,
                        password: accountForm.password,
                        name: {firstname: accountForm.name.firstname, lastname: accountForm.name.lastname},
                        address: {city: accountForm.address.city,
                                  street: accountForm.address.street,
                                number: accountForm.address.number,
                            zipcode: accountForm.address.zipcode},
                        phone: accountForm.phone,
                    })
                });

                //parse to JSON object
                const account = await response.json();
                //set the state of added player
                setAccountForm(account);
            }
            catch(error) {
                setError(error.message);
            }

            //reset form input values after submitting the form
            setAccountForm({
                email: "", 
                username: "", 
                password: "", 
                name: {
                    firstname: "", 
                    lastname: ""},
                address:{
                    city: "",
                    street: "",
                    number: "",
                    zipcode: ""
                }, 
                phone: ""});
    }

    return (
        <div className="create-account-page">
        {/* conditionally render error message stored by the error state variable */}
            <div id="form-container">
               <form id="account-form" onSubmit={handleSubmit}>
                    <label className="form-input"> Email
                        <input type="text" value={accountForm.email} onChange={(e) => setAccountForm({...accountForm, email: e.target.value})} /> 
                    </label><br/>

                    <label className="form-input"> Username{""}
                        <input type="text" value={accountForm.username} onChange={(e) => setAccountForm({...accountForm, username: e.target.value})} />
                    </label><br/>

                    <label className="form-input"> Password
                        <input type="password" value={accountForm.password} onChange={(e) => setAccountForm({...accountForm, password: e.target.value})} /> 
                    </label><br/>

                    <label className="form-input"> First Name
                        <input type="text" value={accountForm.name.firstname} onChange={(e) => { const fname = {...accountForm}; fname.name.firstname = e.target.value; setAccountForm(fname)} }/> 
                    </label><br/>

                    <label className="form-input"> Last Name
                        <input type="text" value={accountForm.name.lastname} onChange={(e) => { const lname = {...accountForm}; lname.name.lastname = e.target.value; setAccountForm(lname)} }/> 
                    </label><br/>
                    <label className="form-input"> City
                        <input type="text" value={accountForm.address.city} onChange={(e) => { const city = {...accountForm}; city.address.city = e.target.value; setAccountForm(city)} }/>
                    </label><br/>

                    <label className="form-input"> Street
                        <input type="text" value={accountForm.address.street} onChange={(e) => { const street = {...accountForm}; street.address.street = e.target.value; setAccountForm(street)} }/> 
                    </label><br/>

                    <label className="form-input"> Number
                        <input type="number" value={accountForm.address.number} onChange={(e) => { const number = {...accountForm}; number.address.number = e.target.value; setAccountForm(number)} }/> 
                    </label><br/>

                    <label className="form-input"> Zip Code
                        <input type="text" value={accountForm.address.zipcode} onChange={(e) => { const zipcode = {...accountForm}; zipcode.address.zipcode = e.target.value; setAccountForm(zipcode)} }/> 
                    </label><br/>

                    <label className="form-input"> Phone
                        <input type="text" value={accountForm.phone} onChange={(e) => setAccountForm({...accountForm, phone: e.target.value})} />
                    </label><br/>
                    <button className="submit-button"> Create Account </button>
               </form>

               <p> Have an account? <Link to="/signIn" > Sign In </Link></p>
            </div>
        </div>
    )
}