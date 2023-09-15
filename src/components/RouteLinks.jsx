import Products from "./Products"
import SelectProduct from "./SelectProduct"
import { Routes, Route } from 'react-router-dom'

export default function RouteLinks() {
    return (
    <Routes>
        <Route path="/products/" element={<Products/>} />
        <Route path="/products/:productId" element={<SelectProduct/>} />
    </Routes>
    )
}



