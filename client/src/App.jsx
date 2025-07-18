import './App.css'
import Home from './pages/Home'
import Header from './components/common/Header'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />

      {
        <Outlet />
      }
      
    </>
  )
}

export default App
