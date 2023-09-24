import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ApplicationCartContext } from "../API/ApplicationCartContext";

export default function Cart(props) {

    const navigate = useNavigate();
    const { id } = useParams();

    //USE LOCAL STORAGE TO GET THE CART ITEMS IN THE LOCAL STORAGE
    //ITEM AT START

    const cart = useContext(ApplicationCartContext);
    console.log("CART: ", cart.cartProducts);

    return (
        <div className="cart-page">
            <h2>CART</h2>
            <div className="cart-div">
                {
                    !cart.cartProducts ? <div className="empty-cart-div"> <h1> Cart is empty </h1>
                    
                    <button onClick={() => navigate(`/products`)}> SHOP FOR PRODUCTS </button>
                    
                    </div> :

                
                    cart.cartProducts.map((item, key) => {
                        return (
                            <div key={key} className="cart-item-product" >
                                <img src={cart.cartProducts[key].image} />
                                <p> Title: {cart.cartProducts[key].title}</p> 
                                <p> Quantity: {cart.cartProducts[key].quantity}</p>
                                <button className="cart-item-button"> - </button> 
                                 {cart.cartProducts[key].quantity} 
                                <button className="cart-item-button"> + </button>
                            </div>

                        )
                    
                    })     
            
                }  
            </div>

        </div>
    )
}