import { createContext, useState, useContext } from "react";

/* CONTEXT - GIVES THE APPLICATION COMPONENTS WRAPPED INSIDE IT, ACCESS TO ITS DATA i.e methods, variables*/
export const ApplicationCartContext = createContext({
    /* blue print that acts like an OO Class */
    //functions for adding and removing products from the cart, first two functions deal with gradual addition/subtraction of quantity from the cart
    productIncreaseToCart: () => {},
    productDecreaseFromCart: () => {},
    cartProducts: [], // items added to the cart will be added to this array

    //removes a product completely from cart, no gradual effect
    productDeleteFromCart: () => {},
    //getters for the cost and amount of products
    totalProductCost: () => {},
    noOfProducts: () => {}, //number of products in the cart
});

//To return the children of this provider 
export function ApplicationCartProvider( { children }) {


    //state hook to keep track of products in cart
    const [productsInCart, setProductsInCart] = useState([]);

    //DEFINE THE FUNCTIONS IN THE CONTEXT TO USE

    /* Returns the quantity of an item in the cart */
    function noOfProducts(item) {
        const quantity =  productsInCart.find((product) => {
            product.id === item.id
        })
        //returns zero if the number of items in the cart is zero
        if (quantity === undefined) {
            return 0;
        }

        console.log("NOOFPRODUCTS: ", quantity);

        return quantity;
    }

    /* Add a product to the cart */
    function productIncreaseToCart(item) {

        const noOfItems = noOfProducts(item.id); //this is the returned number of items in the cart from the noOfProducts function


        const cartItem = productsInCart.find((product) => {
            return product.id === item.id;
        });

        const newItem = {...item, quantity: 1};

        if(cartItem) {
            const newCart = [...productsInCart].map((prod) => {
                if(prod.id === item.id) {
                    return {...prod, quantity: cartItem.quantity + 1 };
                } else {
                    return prod;
                }
            });
            setProductsInCart(newCart);
        }
        else {
            setProductsInCart([...productsInCart, newItem])
        }


        // else {
        //     setProductsInCart(
        //         [...productsInCart].map((product) => {
        //            if(product.id === item.id) 
        //                 // product.quantity = quantity + 1;
        //             //  return {...product, quantity: product.quantity + 1} 
        //             return 0;
        //                                 
        //         })
        //     )
        // }
        //     setProductsInCart(productsInCart => {
        //         if (productsInCart.find( (product) => { product.id === item.id ) == null) {
        //             return [...productsInCart, { id: [item.id], quantity: 1}]
        //         }
        //         else {
        //             return productsInCart.map(product => {
        //                 if (product.id === item.id) {
        //                 return { ...product, quantity: product.quantity + 1} }
        //                 else {
        //                     return product
        //                 }
        //             })
        //     }
        //     }
        // )


        //check the cart if the product is there. Product already in the cart, increase its quantity 

            //modify the quantity of the found product
           //use spread operator to extract the values of the product to modify it











//         setProductsInCart(itemsInCart => {
//             if (itemsInCart.find( product => product.id === cartProductId ) == null) {
//                 return [...itemsInCart, {cartProductId, quantity: 1}]
//             }
//             else {
//                 return itemsInCart.map(product => {
//                     if (product.id === cartProductId) {
//                     return { ...product, quantity: product.quantity + 1} }
//                     else {
//                         return product
//                     }
//                 })
//             }
//         })


        // console.log("CARTPRODUCTID: ", cartProductId)
    }
    //setCart([...cart, product]);
    /* Remove a product from the cart */
    function productDecreaseFromCart(item) {
        const cartItem = productsInCart.filter((product) => {
            return product.id === item.id;
        });

        const newItem = {...item, quantity: 1};

        if(cartItem) {
            const newCart = [...productsInCart].map((prod) => {
                if(prod.id === item.id) {
                    return {...prod, quantity: cartItem.quantity + 1 };
                } else {
                    return prod;
                }
            });
            setProductsInCart(newCart);
        }
        else {
            setProductsInCart([...productsInCart, newItem])
        }
    }


    /* Get the total cost of the products in the cart */
    function totalProductCost() {

    }


    /* Delete a product abruptly from the cart */
    function productDeleteFromCart(cartProductId) {
        // setProductsInCart(itemsInCart => {
        //     return itemsInCart.filter(product => product.id !== cartProductId)
        // })
    }
        const context = {          
            productIncreaseToCart,
            cartProducts: productsInCart,
            productIncreaseToCart,
            productDecreaseFromCart,
            productDeleteFromCart,
            totalProductCost,
            noOfProducts
        }

    return (
        <ApplicationCartContext.Provider value={
            //list of values passed to the provider component value - will be available to the components that access it through useContext
            context
    
    }> { children } </ApplicationCartContext.Provider>
    )
}  