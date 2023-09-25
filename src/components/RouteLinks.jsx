import Products from "./Products"
import SelectProduct from "./SelectProduct"
import { Routes, Route } from 'react-router-dom'
import SignIn from "./SignIn"
import NewAccount from "./NewAccount"
import Cart from "./Cart"
import Checkout from "./Checkout"
import OrderPlaced from "./OrderPlaced"

export default function RouteLinks( {token, setToken}) {
    return (
    <Routes>
        <Route path="/products/" element={<Products/>} />
        <Route path="/products/:id" element={<SelectProduct/>} />
        <Route path="/signIn/" element={<SignIn token={token} setToken={setToken} />} />
        <Route path="/signUp/" element={<NewAccount/>} />
        <Route path="/cart/" element={<Cart/>} />
        <Route path="/checkout/" element={<Checkout/>} />
        <Route path="/orderplaced/" element={<OrderPlaced/>} />
    </Routes>
    )
}



