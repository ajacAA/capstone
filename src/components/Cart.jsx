import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function Cart() {

    const [cart, setCart] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();
    //get url id for a specific product
    const {id} = useParams();

       //FORM AT ITS START STATE

    useEffect(() => {
        //The function returns an array of product objects
        async function CartItems () {
          try {
            const response = await fetch('https://fakestoreapi.com/carts/user/2')
            const itemsInCart = await response.json();

            console.log("Cart items", itemsInCart);
            setCart(itemsInCart);

            console.log("CART: ", cart);


    
          } catch (err) {
            console.error(err)
          }
        }
        CartItems();
      }, [])


      //adding items to cart
      async function deleteProduct(id) {
        
      }
      //products in the cart
    //   useEffect(() => {
    //     async function CartProducts() {
    //         let cartList = [];
    //         
    //         for (const product of cart.products || []) {
    //             const details = await getSingleProduct(product.productId);
    //             cartList.push(details);
    //         }
    //         setCartProducts(cartList);
    //     }
    //         cartProducts();
    //   }, [])



      return (
        <div className="cart-page">
            <h2>CART</h2>
            <div className="cart-div">
            {
                !cart ? <div className="empty-cart-div"> <h1> Cart is empty </h1>
                
                <button onClick={() => navigate(`/products`)}> SHOP FOR PRODUCTS </button>
                
                </div> :
                cart.map((item, key) => {
                    return (
                        <div key={key} className="products-in-cart">
                            <img src={item.image} />
                            <h4> {item.title} </h4>
                            <p> ${item.id} </p> <br/>
                        </div>
                    )
                })
        
            }  
            </div>

        </div>
    )
}


