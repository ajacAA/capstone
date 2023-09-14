/* FETCHING A PRODUCT FROM THE API */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SelectProduct() {
    ////using useState hook, create variables to hold players and set players
    const [product, setProduct] = useState({});
    const { id } = useParams();

    //useEffect to 
    useEffect( () => {
        //Calls the fetch function
        async function Product() {
            try {
                //get sole item from the api
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
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
        <div className="a-product">
            <h4>{product.name}</h4>
            <img src={product.image} />
            <p> Description <br/> {product.description} </p>
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