import './App.css'
import RouteLinks from './components/RouteLinks'
import { useState } from 'react'
import NavigationBar from './components/NavigationBar'
import { ApplicationCartProvider } from './API/ApplicationCartContext';

function App() {
  
  const [token, setToken] = useState(null);
  
  return (
        <ApplicationCartProvider>
          <NavigationBar setToken={setToken}/>
          <RouteLinks token={token} setToken={setToken}/>
        </ApplicationCartProvider>

  )
}

export default App
