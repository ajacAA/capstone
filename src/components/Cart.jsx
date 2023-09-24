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
  
                {
                    !cart.cartProducts ? <div className="empty-cart-div"> <h1> Cart is empty </h1>
                    
                    <button onClick={() => navigate(`/products`)}> SHOP FOR PRODUCTS </button>
                    
                    </div> :

                
                    cart.cartProducts.map((item, key) => {
                        return (
                            <div key={key} className="cart-item-product" >
                                <div className="cart-title-img">
                                    <img className="cart-img" src={cart.cartProducts[key].image} />
                                    <p className="cart-title-price"> {cart.cartProducts[key].title}</p> 
                                    <p style={ {color: 'black', fontSize: 18} }> ${cart.cartProducts[key].price} </p>
                                </div>
                  
                                <div className="cart-delete-container">
                                    <div className="cart-add-minus-button">
                                        <button className="cart-minus-button" onClick={() => cart.productDecreaseFromCart(cart.cartProducts[key])} > - </button>
                                        <div className="card-product-quantity"> { cart.cartProducts[key].quantity} </div>
                                        <button className="cart-add-button" onClick={() => cart.productIncreaseToCart(cart.cartProducts[key])}> + </button>
                                    </div>
                                    <button className="cart-delete-button" onClick={() => cart.productDeleteFromCart(cart.cartProducts[key])}> Delete </button> 
                                </div>
                            </div>

                        )
                    
                    })     
            
                } 
        </div>
    )
}