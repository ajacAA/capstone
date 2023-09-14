import { useEffect, useState } from 'react'
import fetchProducts from '../API/apiurl'
import { useNavigate, useParams } from 'react-router-dom';


export default function Products() {
  const [products, setProducts] = useState([]);
  //hook to navigate to a single product
  const navigate = useNavigate();
  //getId specific product id
  const { productId } = useParams; 

  useEffect(() => {
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
    <h2> Alkiin Net Shop </h2>
        {
        products.map((item, key) => {
            return (
                <div key={key} className="products" 
                /* Navigate to the selected products div. Show the details of the product */
                onClick={ () => navigate(`/product/${item.productId}`) }
                    >

                    <img src={item.image} />
                    <h4> {item.title} </h4>
                    <p> ${item.price} </p> <br/>
                    <button class="add-cart"> add to cart </button>
                </div>
            )
        }) 
        } 
    </>
    )



}

