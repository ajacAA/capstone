import { useEffect, useState } from 'react'
import fetchProducts from '../API/apiurl'
import { useNavigate, useParams } from 'react-router-dom';


export default function Products() {
  const [products, setProducts] = useState([]);
  //hook to navigate to a single product
  const navigate = useNavigate();
  //getId specific player id
  const { id } = useParams; 

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
        {
        products.map((product, key) => {
            //return this div
            return (
            <>
                <div key={key} className="products">
                    <h2> {product.title} </h2>
                    <img src={product.image} />
                    <p> Description <br/> {product.description} </p>
                    <p> Price: {product.price} </p>

                    <div>
                    <   button onClick={ () => navigate(`/players/${product.id}`) }> View </button>
                    </div> 
                </div>

  
            </>
            )
        }) 
        } 
    </>
    )



}

