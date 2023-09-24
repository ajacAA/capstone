//API URL
const products = 'https://fakestoreapi.com/products';

/* FUNCTION TO FETCH PRODUCTS FROM THE API */
export default async function fetchProducts() {
    try {
        const response = await fetch(products);
        const result = await response.json();
        console.log("Products in fetch", result);
        return result;
    }
    catch(error) {
        console.log("Problem fetching products");
    }

}


