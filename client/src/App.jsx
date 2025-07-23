import './App.css'
import Home from './pages/Home'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />

      {
        <Outlet />
      }

      {/* <Footer/> */}
      
    </>
  )
}

export default App
