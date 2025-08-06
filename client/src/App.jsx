import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Outlet } from 'react-router-dom'
import { useGlobalContext } from './provider/GlobalProvider'
import { useEffect, useState } from 'react'

function App() {

  const { fetchIsLogin } = useGlobalContext()
  const [isLogin, setIsLogin] = useState(null)

  useEffect(() => {
    setIsLogin(fetchIsLogin())
  }, [fetchIsLogin])

  if (isLogin === null) return null

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
