import './App.css'
import Products from './components/Products'
import SelectProduct from './components/SelectProduct'
import SignUp from './components/SignUp'
import RouteLinks from './components/RouteLinks'
import NewAccount from './components/NewAccount'
import SignIn from './components/SignIn'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState(null);
  return (
    <>  
        <RouteLinks />
        <SignIn token={token} setToken={setToken} />
    </>
  )
}

export default App
