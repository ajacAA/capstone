import './App.css'
import Products from './components/Products'
import SelectProduct from './components/SelectProduct'
import SignUp from './components/SignUp'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
        <Products />
        <SignUp />
        <Routes>
            <Route path="/" element={<Products/>} />
            <Route path="/product/:productId" element={<SelectProduct/>} />
        </Routes>
    </>
  )
}

export default App
