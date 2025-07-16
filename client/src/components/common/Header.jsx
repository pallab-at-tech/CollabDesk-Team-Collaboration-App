import React from 'react'


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
                <div>
                    sign in
                </div>

                <div className='md:block hidden'>
                    sign up
                </div>
            </div>
        </header>
    )
}

export default Header
