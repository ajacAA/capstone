import './App.css'
import RouteLinks from './components/RouteLinks'
import { useState } from 'react'
import NavigationBar from './components/NavigationBar'

function App() {
  
  const [token, setToken] = useState(null);
  
  return (
    <>  
        <NavigationBar setToken={setToken}/>
        <RouteLinks token={token} setToken={setToken}/>
    </>
  )
}

export default App
