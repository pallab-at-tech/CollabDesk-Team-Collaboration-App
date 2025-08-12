import React from 'react'
import { IoSendOutline } from "react-icons/io5";
import { MdAttachment } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdManageSearch } from "react-icons/md";
import { useSelector } from 'react-redux';

const MessagePage = () => {

    const chat_details = useSelector(state => state.chat?.all_message)

    console.log("pure checking",chat_details)
 
    return (
        <section className='h-[calc(100vh-60px)] grid grid-rows-[65px_1fr_55px]'>

            <div className='bg-[#21222b] px-4 grid grid-cols-[300px_1fr] w-full items-center text-white shadow-md shadow-[#57575765]'>

                <div className='flex gap-2.5 pl-2'>
                    <div className='flex items-center justify-center'>
                        <RxAvatar size={38} />
                    </div>

                    <div className='flex flex-col leading-tight text-base items-start'>
                        <p>Abir</p>
                        <p>ab@4567</p>
                    </div>
                </div>

                <div className='flex items-center justify-end'>
                    <MdManageSearch size={30} className='cursor-pointer' />
                </div>
            </div>

            <div className='h-full overflow-y-auto' style={{ willChange: 'transform' }}>
                {/* {
                    Array.from({ length: 50 }).map((v, i) => {
                        return (
                            <div className='h-16 bg-red-500 my-2'>
                                {i}
                            </div>
                        )
                    })
                } */}
            </div>


            <div className='bg-[#1f2029] w-full rounded-t-md grid grid-cols-[100px_1fr_100px] items-center text-white shadow-md shadow-[#154174]'>

                <div className='flex items-center justify-center cursor-pointer'>
                    <MdAttachment size={29} />
                </div>

                <div>
                    <input type="text" className='w-full text-[#f3f3f3] outline-none' placeholder='Type a message...' />
                </div>

                <div className='flex items-center justify-center cursor-pointer'>
                    <IoSendOutline size={29} />
                </div>

            </div>

        </section>
    )
}

export default MessagePage
