import { createContext, useState, useEffect, useContext } from "react";

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
    getThisItem: () => {}, //number of products in the cart
});

//To return the children of this provider 
export function ApplicationCartProvider( { children }) {


    //state hook to keep track of products in cart
    const [productsInCart, setProductsInCart] = useState([]);

    //DEFINE THE FUNCTIONS IN THE CONTEXT TO USE

    /* Returns the item added and it's quantity can be retreaved through the dot product to access its quantity the cart */
    function getThisItem(item) {
        const cartProd =  productsInCart.find((product) => {
           return product.id === item.id
        })
        //returns zero if the number of items in the cart is zero
        if (cartProd === undefined) {
            return 0;
        }

        console.log("NOOFPRODUCTS: ", cartProd);

        return cartProd;
    }

    /* Add a product to the cart */
    function productIncreaseToCart(item) {

        //returned item from getThisItem, check the cart if the product is there.
        const myItem = getThisItem(item);

        //add if not found in the array
        const newProduct = {...item, quantity: 1};
        //Product already in the cart, increase its quantity
        if(myItem) {
            //use spread operator to extract the values of the product to modify it
            const cartItem = [...productsInCart].map((prod) => {
                if(prod.id === item.id) {
                    return {...prod, quantity: myItem.quantity + 1 };
                } else {
                    return prod;
                }
            });
            setProductsInCart(cartItem);
        }
        else {
            setProductsInCart([...productsInCart, newProduct])
        }  
    }

    /* Remove a product from the cart */
    function productDecreaseFromCart(item) {
        //returned item which is found in the array
        const myItem = getThisItem(item);

        //Item is found, decrement the amount in the cart
        if(myItem) {
            const cartItem = productsInCart.map((prod) => {
                if(prod.id === item.id) {
                    return {...prod, quantity: myItem.quantity - 1 };
                } else {
                    return prod;
                }
            });
            setProductsInCart(cartItem);
        }
        if(myItem.quantity === 1)
        productDeleteFromCart(item);
   
    }


    /* Get the total cost of the products in the cart */
    function totalProductCost() {
        let sum = 0;
        productsInCart.map((product) => {
            const returnedItem = getThisItem(product);
            sum += (returnedItem.price * product.quantity);
        })
        return sum;
    }


    /* Delete a product abruptly from the cart */
    function productDeleteFromCart(item) {
        setProductsInCart(itemsInCart => {
            return itemsInCart.filter(product => product.id !== item.id)
        })
    }
        const context = {          
            productIncreaseToCart,
            cartProducts: productsInCart,
            productIncreaseToCart,
            productDecreaseFromCart,
            productDeleteFromCart,
            totalProductCost,
            getThisItem,
        }

    return (
        <ApplicationCartContext.Provider value={
            //list of values passed to the provider component value - will be available to the components that access it through useContext
            context
    
    }> { children } </ApplicationCartContext.Provider>
    )
}  