import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from "../../provider/GlobalProvider"
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from 'react-redux';



const Header = () => {

    const { fetchIsLogin } = useGlobalContext()

    const [isLogin, setIsLogin] = useState(null)

    const user = useSelector(state => state.user)

    const boardURL = `/board/${user?.name}-${user?._id}/${user?.roles[0]?.teamId}`

    useEffect(() => {
        setIsLogin(fetchIsLogin())
    }, [fetchIsLogin])

    if (isLogin === null) return null

    

    return (
        <header className={`${isLogin ? "bg-A-off-color" : "bg-[var(--primary-color)]"} min-h-[60px] grid grid-cols-[1fr_2fr_2fr] items-center relative z-50`}>

            <div>
                logo
            </div>

            <div className='flex items-center justify-center md:gap-[20%] gap-8 text-A-off-text font-semibold'>
                <div>
                    Features
                </div>

                <div>
                    about
                </div>
            </div>

            <div className='flex items-center justify-center gap-10'>

                {
                    isLogin ? (
                        <>
                            <div className='text-A-off-text font-semibold cursor-pointer'>
                                <IoIosNotifications size={24} />
                            </div>

                            <Link to={boardURL} className='text-A-off-text font-semibold'>
                                Board
                            </Link>
                        </>
                    ) : (
                        <Link to={"/login"} className='bg-[#005eff] py-[7px] px-3 rounded text-white transition-all duration-150 hover:bg-[#0055e8] hover:scale-105 cursor-pointer text-center'>
                            sign in
                        </Link>
                    )
                }

            </div>

        </header>
    )
}

export default Header
