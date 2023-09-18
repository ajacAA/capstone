import { useEffect, useState } from 'react'
import fetchProducts from '../API/apiurl'
import { useNavigate, useParams } from 'react-router-dom';


export default function Products() {
  //keep track of the products in the array
  const [products, setProducts] = useState([]);

  const nav = useNavigate();
  useEffect(() => {
    //The function returns an array of product objects
    async function AllProducts (){
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        console.log("Products", productsData);

      } catch (err) {
        console.error(err)
      }
    }
    AllProducts();
  }, [])



  return (
    <>
    {/* RENDER ALL PRODUCTS */}
    <div>
        <h2> Alkiin Net Shop </h2>
    </div>

        {
        products.map((item, key) => {
            return (
           
                <div key={key} className="product-with-cart-button" >
                    <div className="products"
                        /* Navigate to the selected products div. Show the details of the product */
                        onClick={() => nav(`/products/${item.id}`)} >
                        <img src={item.image} />
                        <h4> {item.title} </h4>
                        <p> ${item.price} </p> <br/>
                    </div>
                        <button className="add-cart-button"> add to cart </button>
                </div>
   
           
            )
         
        })    
        
        }  
    </>
    )



}


// onClick={navigate(`/products/${item.productId}`)}