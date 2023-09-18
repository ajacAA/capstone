import Products from "./Products"
import SelectProduct from "./SelectProduct"
import { Routes, Route } from 'react-router-dom'
import SignIn from "./SignIn"

export default function RouteLinks() {
    return (
    <Routes>
        <Route path="/products/" element={<Products/>} />
        <Route path="/products/:productId" element={<SelectProduct/>} />
        <Route path="/signIn/" element={<SignIn/>} />
    </Routes>
    )
}



