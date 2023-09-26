import { ApplicationCartContext } from "../API/ApplicationCartContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchUsers from "../API/users";

export default function Checkout({token, setToken}) {
    // Format the price above to USD 
    let dollarAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    //use navigate to navigate to placed order
    const navigate = useNavigate();
    // const { id } = useParams();
    //import context
    const cartContext = useContext(ApplicationCartContext);

    //states for card info and user
    const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiration: "",
    cvv: ""}
    );
    //state for the user object. use to store form info
    const [user, setUser] = useState({
        email: "", username: "", password: "", name: {firstname: "", lastname: ""},
        address:{
            city: "",
            street: "",
            number: "",
            zipcode: ""
        }, phone: ""});


    //delivery address for guest user
    const [guestUser, setGuestUser] = useState({
        name: "", phoneNumber: "", address: {
            street: "", apt: ""
        },
        city: "",
        state: "",
        zipcode: ""
    })

  //keep track of the users in the array
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    //returns an array of user objects
    async function Users (){
      try {
        const response = await fetchUsers();
        const users = await response.json();
        setAllUsers(users);
        console.log("Users", users);

      } catch (err) {
        console.error(err)
      }
    }
    Users();
  }, [])


    //fetch user
    useEffect(() => {
        //The function returns an array of product objects
        async function fetchUser (){
          try {
            const response = await fetch(`https://fakestoreapi.com/users/1`);
            const userObj = await response.json();
            setUser(userObj);
            console.log("User", userObj);
    
          } catch (err) {
            console.error(err)
          }
        }
        fetchUser();
      }, [])



      async function handleSubmit(event) {
        event.preventDefault();
        //input validation
    
      }

      async function handleShipping(event) {
        event.preventDefault();
        //input validation
    
      }

    return (
        <div className="checkout-page">
            <h3> Checkout Continuation </h3>

            { token ? 
                <section>
                    <div className="shipping-box">
                        <p>Shipping to: {user.name.firstname}  {user.name.lastname} </p>

                        <p>Order Total: {dollarAmount.format(cartContext.totalProductCost())} </p>

                    </div>

                    <p> Delivering address <br/>
                        {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}
                    </p> 
                </section>
                :
                /* Guest checkout - only show the shipping form if user is not logged in */
                          
                /* for guest purchase */
                <form className="shipping-form" onSubmit={handleShipping}>

                    <label className="form-input"> Full Name
                        <input type="text" value={guestUser.name} onChange={(e) => setGuestUser({...guestUser, name: e.target.value})} /> 
                    </label><br/>
        
                    <label className="form-input"> Phone 
                        <input type="text" value={guestUser.phoneNumber} onChange={(e) => setGuestUser({...guestUser, phoneNumber: e.target.value})} /> 
                    </label><br/>

                    <label className="form-input"> Address
                        <input type="text" value={guestUser.address.street} onChange={(e) => { const st = {...guestUser}; st.address.street = e.target.value; setGuestUser(st)}} placeholder="Street Address"/> 
                        <input type="text" value={guestUser.address.apt} onChange={(e) => { const ap = {...guestUser}; ap.address.apt = e.target.value; setGuestUser(ap)}} placeholder="APT unit, building"/> 
                    </label><br/>
                    
                    <label className="form-input"> City
                        <input type="text" value={guestUser.city} onChange={(e) => setGuestUser({...guestUser, city: e.target.value})} /> 
                    </label><br/>
    
                    <label className="form-input"> State
                        <input type="text" value={guestUser.state} onChange={(e) => setGuestUser({...guestUser, state: e.target.value})} /> 
                    </label><br/>

                    <label className="form-input"> ZipCode
                        <input type="text" value={guestUser.zipcode} onChange={(e) => setGuestUser({...guestUser, zipcode: e.target.value})} /> 
                    </label><br/>

                </form>

            } {/* end of user loggedIn info */}

            <p> Payment Information </p>

            <form className="payment-form" onSubmit={handleSubmit}>

                <label className="form-input"> Card Number
                    <input type="text" value={cardInfo.number} onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})} /> 
                </label><br/>

                <label className="form-input"> Expiration Date
                    <input type="text" value={cardInfo.expiration} onChange={(e) => setCardInfo({...cardInfo, expiration: e.target.value})} placeholder="MM/YY" /> 
                </label><br/>

                <label className="form-input"> Name on Card
                    <input type="text" value={cardInfo.name} onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})} placeholder="Full Name"/> 
                </label><br/>

                <label className="form-input"> Security Code
                    <input type="text" value={cardInfo.cvv} onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})} placeholder="3 digit code" /> 
                </label><br/>

            </form>

            <p>Items </p>
            {
                cartContext.cartProducts.map((product, key) => {
                    return(
                        <div key={key} className="checkout-products" >
                        <p> {product.title}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: {dollarAmount.format(product.price)}</p>
                    </div>
                    )
                })
            }
            {
                !token && <p>Order Total: {dollarAmount.format(cartContext.totalProductCost())} </p>
            }

            {/* after order is placed, remove all the items from the cart */}
            <button onClick={() => navigate('/orderplaced/')}> Place Your Order </button>
        </div>
    )
}