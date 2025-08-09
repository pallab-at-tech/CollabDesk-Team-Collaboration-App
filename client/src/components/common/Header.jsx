import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from "../../provider/GlobalProvider"
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";


const Header = () => {

    const { fetchIsLogin } = useGlobalContext()

    const [isLogin, setIsLogin] = useState(null)

    const user = useSelector(state => state.user)

    const boardURL = `/board/${user?.name}-${user?._id}/${user?.roles[0]?.teamId}`
    const mobileBoardURL = `/board/${user?.name}-${user?._id}`

    const profileURL = `/profile/${user?.name}`


    useEffect(() => {
        setIsLogin(fetchIsLogin())
    }, [fetchIsLogin])

    if (isLogin === null) return null




    return (
        <header className={`${isLogin ? "bg-A-off-color" : "bg-[var(--primary-color)]"} min-h-[60px] grid mini_tab:grid-cols-[1fr_2fr_2fr] grid-cols-2 items-center z-50 sticky top-0 `}>

            <Link to={"/"} className={`${isLogin ? "text-white" : ""}`}>
                logo
            </Link>

            <div className={`items-center justify-center md:gap-[20%] gap-8 ${isLogin ? "text-A-off-text" : ""} font-semibold mini_tab:flex hidden`}>
                <div>
                    Features
                </div>

                <div>
                    about
                </div>
            </div>

            <div className='flex items-center justify-center mini_tab:gap-10 gap-7'>

                {
                    isLogin ? (
                        <>
                            <div className='text-A-off-text font-semibold cursor-pointer'>
                                <IoIosNotifications size={24} />
                            </div>

                            {
                                user.avatar ? (
                                    <div>IMG</div>
                                ) : (
                                    <Link to={profileURL} className='text-A-off-text'>
                                        <CgProfile size={24} />
                                    </Link>
                                )
                            }

                            {
                                user?.roles?.length !== 0 && (
                                    <>
                                        <Link to={boardURL} className='text-A-off-text font-semibold lg-real:block hidden'>
                                            Board
                                        </Link>

                                        <Link to={mobileBoardURL} className='text-A-off-text font-semibold lg-real:hidden block'>
                                            Board
                                        </Link>
                                    </>
                                )
                            }

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
