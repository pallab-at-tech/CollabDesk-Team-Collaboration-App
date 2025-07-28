import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import searchMember from "../../assets/search-member.png"

const SearchMember = ({close}) => {
    return (
        <section className='fixed right-0 left-0 top-0 bottom-0 flex flex-col items-center justify-center z-50 bg-gray-800/70'>

            <div className='min-h-[220px] max-h-[220px] min-w-[350px] bg-[#dbdbdb] rounded  px-1 relative'>

                <h1 className='py-1 px-4 font-semibold'>Search member :</h1>

                <div className='w-fit absolute top-0.5 right-4 cursor-pointer' onClick={()=>close()}>
                    <IoIosClose size={28}/>
                </div>

                <div className='flex flex-col gap-y-2.5 justify-center items-center relative'>

                    <div className='absolute left-6 text-white'>
                        <IoIosSearch size={22} />
                    </div>

                    <input type="text" className='w-[90%] bg-gray-400 outline-none h-[30px] px-2 pl-10 py-2' placeholder='Type user-ID here ...' />

                </div>

                <img src={searchMember} alt="" className='absolute h-[140px] bottom-0 left-0 pointer-events-none' />

            </div>

        </section>
    )
}

export default SearchMember
