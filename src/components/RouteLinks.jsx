import Products from "./Products"
import SelectProduct from "./SelectProduct"
import { Routes, Route } from 'react-router-dom'
import SignIn from "./SignIn"
import NewAccount from "./NewAccount"
import Cart from "./Cart"
import { set } from "react-hook-form"

export default function RouteLinks( {token, setToken}) {
    return (
    <Routes>
        <Route path="/products/" element={<Products/>} />
        <Route path="/products/:productId" element={<SelectProduct/>} />
        <Route path="/signIn/" element={<SignIn token={token} setToken={setToken} />} />
        <Route path="/signUp/" element={<NewAccount/>} />
        <Route path="/cart/" element={<Cart/>} />
    </Routes>
    )
}



