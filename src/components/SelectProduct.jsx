/* FETCHING A PRODUCT FROM THE API */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SelectProduct() {
    ////using useState hook, create variables to hold players and set players
    const [product, setProduct] = useState({});
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        async function Product() {
            try {
                //get sole item from the api
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                console.log("USE PARAMS IN SINGLE PRODUCT", productId)
                console.log("RESPONSE ", response);
                const productObj = await response.json();
                setProduct(productObj);
                console.log("single product", productObj);
            }
            catch(error) {
                console.log("Error fetching a single product", error);
            }
        }
            Product();
    },[]);

    return (
    <>
        <div className="single-product-main-div" >
        
            <button className="single-product-back-button"
            onClick={() => navigate(`/products`)}> Back </button>
            <div className="single-product">
                <img src={product.image} />
                <h4> {product.title} </h4>
                <p> ${product.price} </p> <br/>
                <p> Description {product.description} </p>
            </div>
                    <button className="add-cart-button"> add to cart </button>
            </div>
   
    </>

    )
}



/* 

1. Add Button To Single Player Component
    The button needs use the useNavigate hook from react-router-dom and navigate 
    to your SinglePlayer component.
2. Follow fetchPlayers steps to fetch single player from the API, render the component
    use the useParams hook along to pull the correct player id from the browser url
*/