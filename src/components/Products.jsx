import { useEffect, useState } from 'react'
import fetchProducts from '../API/apiurl'


export default function Products() {
  const [products, setProducts] = useState([])

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
                <div key={key} className="products">
                    <h2> {product.title} </h2>
                    <img src={product.image} />
                    <p> Description <br/> {product.description} </p>
                    <p> Price: {product.price} </p>
                </div>
            )
        }) 
        } 
    </>
    )



}

