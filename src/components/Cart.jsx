import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function Cart() {

    const navigate = useNavigate();

    //USE LOCAL STORAGE TO GET THE CART ITEMS IN THE LOCAL STORAGE
    //ITEM AT START
    const [item, setItem] = useState({
    image: "", title: "A", price: "", inCart: false
    });
        //add item to cart
    const [cartItems, setCartItems] = useState([])

    const [cart, setCart] = useState([]);
    

    cart.push(item);

    //quantity is 0;
    //if quantity is 1, incart is set to true

    //delete item from cart local storage
    async function deleteProduct(id) {


    }

    //add item to cart local storage
    async function addProduct(item) {
    
    }

    return (
        <div className="cart-page">
            <h2>CART</h2>
            <div className="cart-div">
            {
                !item.inCart ? <div className="empty-cart-div"> <h1> Cart is empty </h1>
                
                <button onClick={() => navigate(`/products`)}> SHOP FOR PRODUCTS </button>
                
                </div> :
                
                cart.map((item, key) => {
                    return (
                        <div key={key}>
                            <p> Image: {item.image} </p>
                            <p> Title: {item.title}</p>
                        </div>
                    )
                })
                // cart.map((item) => {
                //     return (
                //         <div key={item.id} className="products-in-cart">
                //             <p> Date: {item.date} </p>
                //             {item.products.map((product, key) => {
                //                 return (
                //                     <div key={key}>
                //                         <p> ProductId: {product.productId} </p>
                //                         <p> Quantity: {product.quantity} </p>
                //                         <button onClick={ async(event) => {deleteProduct(product.productId)}}> REMOVE </button>
                //                     </div>
                //                   
                //                 )
                //             })}
                //         </div>
                //     )
                // })
        
            }  
            </div>

        </div>
    )
}