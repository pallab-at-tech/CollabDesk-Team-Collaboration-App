import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";
import { RiEmojiStickerLine } from "react-icons/ri";

const RealHome = () => {
    return (
        <section className='bg-A-color min-h-[calc(100vh-60px)] grid grid-cols-2 place-items-center'>

            <div className='flex flex-col gap-2 text-A-off-color text-3xl font-semibold'>

                <Link className='flex gap-1 items-center bg-B-color rounded w-[250px] px-3 py-4 hover:bg-[#93c89b] transition-colors duration-150'>
                    <div className=' w-full block px-2 py-1'>create team</div>
                    <MdOutlineCreateNewFolder size={38} />
                </Link>

                <Link className='flex gap-1 items-center bg-B-color rounded w-[250px] px-3 py-4 hover:bg-[#93c89b] transition-colors duration-150'>
                    <div className=' w-full block px-2 py-1'>join team</div>
                    <MdOutlinePostAdd size={38} />
                </Link>


                <Link className='w-[250px] text-[#00270d] pt-2 text-base underline leading-[19px]'>
                    know more about our service
                </Link>

            </div>


            <div className='bg-B-color text-A-off-color text-lg font-semibold w-full h-full shadow-[-5px_-6px_10px_0px_rgba(143,212,139,0.2)]'>

                <div className='float-right p-4 cursor-pointer' title='full screen'>
                    <MdFullscreen size={28}/>
                </div>

                <div className='flex items-center justify-center h-full select-none'>

                    <div className='flex items-center gap-1'>
                        <p>You haven't join any team yet !</p>
                        <RiEmojiStickerLine size={22}/>
                    </div>
                </div>
                
            </div>


        </section>
    )
}

export default RealHome
