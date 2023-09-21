import './App.css'
import Products from './components/Products'
import SelectProduct from './components/SelectProduct'
import RouteLinks from './components/RouteLinks'
import NewAccount from './components/NewAccount'
import SignIn from './components/SignIn'
import { useState } from 'react'
import NavigationBar from './components/NavigationBar'

function App() {
  const [token, setToken] = useState(null);
  return (
    <>  
        <NavigationBar token={token} setToken={setToken}/>
        <RouteLinks token={token} setToken={setToken}/>
    </>
  )
}

export default App
