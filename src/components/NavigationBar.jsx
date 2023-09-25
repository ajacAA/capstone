import { Link } from "react-router-dom"
import { useContext } from "react";
import { ApplicationCartContext } from "../API/ApplicationCartContext";

export default function NavigationBar( {setToken} ) {

    const cartContext = useContext(ApplicationCartContext);
    const noOfItemsInCart = cartContext.cartProducts.reduce((sum, item) => sum + item.quantity, 0);

    return ( !localStorage.getItem('token') ? 
        <nav className="navbar-unsigned">
            <Link className="logoImg" to="/products"> Logo </Link>
           
            <ul className="navbar-links">
                <li><Link to="/cart"> Cart ({noOfItemsInCart}) </Link></li>
                <li><Link to="/signIn"> Sign In </Link></li>
                <li><Link to="/signUp"> Sign Up </Link></li>
            </ul>
     
        </nav> :
        //show this navbar when user is logged in
        <nav className="navbar-signed">

<           Link className="logoImg" to="/products"> Logo </Link>
           
           <div className="navbar-links">
               <Link to="/cart"> Cart {/*quantity of items in the cart*/}</Link>
               <Link onClick={ () => {  setToken(null);
                    localStorage.removeItem("token");
               }
                
             } to="/products/"> Sign Out </Link>
           </div>


        </nav>
    )
}