import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header className='bg-[var(--primary-color)] min-h-[60px] grid grid-cols-[1fr_2fr_2fr] items-center'>

            <div>
                logo
            </div>

            <div className='flex items-center justify-center md:gap-[20%] gap-8'>
                <div>
                    Features
                </div>

                <div>
                    about
                </div>
            </div>

            <div className='flex items-center justify-center gap-10'>
                <Link to={"/login"} className='bg-[#005eff] py-[7px] px-3 rounded text-white transition-all duration-150 hover:bg-[#0055e8] hover:scale-105 cursor-pointer text-center'>
                    sign in
                </Link>
            </div>

        </header>
    )
}

export default Header
