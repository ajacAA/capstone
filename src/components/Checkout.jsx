import { ApplicationCartContext } from "../API/ApplicationCartContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({token, setToken}) {
    // Format the price above to USD 
    let dollarAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    //use navigate to navigate to placed order
    const navigate = useNavigate();

    //import context
    const cartContext = useContext(ApplicationCartContext);

    //states for card info and user
    const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiration: "",
    cvv: ""}
    );
    //user already in the api
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

    //fetch user
    useEffect(() => {
        //The function returns an array of product objects
        async function fetchUser (){
          try {
            const response = await fetch('https://fakestoreapi.com/users/1');
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
    
      }

      async function handleShipping(event) {
        event.preventDefault();
    
      }


    return (
        <div className="checkout-page">
            <h3> Checkout Continuation </h3>

            <div className="shipping-box">
                <p>Shipping to: {user.name.firstname}  {user.name.lastname} </p>

                <p>Order Total: {dollarAmount.format(cartContext.totalProductCost())} </p>

            </div>

            {/* only show the shipping form if user is not logged in */}

            {
              token ? <p> Delivering address <br/>
                {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}
                
                </p> :            
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

            }



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
                        <div className="checkout-products" >
                        <p> {product.title}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: {dollarAmount.format(product.price)}</p>
            
                    </div>
                    )
                })
            }

            {/* after order is placed, remove all the items from the cart */}
            <button onClick={() => navigate('/orderplaced/')}> Place Your Order </button>
        </div>
    )
}