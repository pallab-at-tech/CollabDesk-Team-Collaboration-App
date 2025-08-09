import React from 'react'
import { useSelector } from 'react-redux'
import { SiTicktick } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";

const ProfileTeamRequest = () => {

    const user = useSelector(state => state.user)

    console.log("user from request", user)
    return (
        <div className='py-3 px-1'>

            <h1 className='text-2xl pt-2 pb-4 font-bold'>Team request</h1>
            <div className='max-w-[400px]'> 
                {
                    user?.request?.map((v, i) => {
                        return (
                            <div className='px-6 py-3 bg-[#a31083] hover:bg-[#9c0b7d] border border-[#ded5dc] transition-colors duration-150 rounded-xl flex items-center justify-between max-w-[72%] my-2.5'>

                                <div className='flex flex-col justify-between'>
                                    <h1 className='font-semibold text-[22px] pb-[1px]'>{v?.teamName}</h1>
                                    <div className='text-[13px] leading-[14px] text-[#d6d6d6] font-[600]'>
                                        <p>{`request send by ,`}</p>
                                        <p>{v?.requestedBy_userId}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 text-sm items-center'>
                                    <div className='flex items-center gap-2 bg-[#ebbeec] hover:bg-[#eab1eb] transition-colors duration-150 text-black px-2 py-1 rounded-2xl cursor-pointer w-full'>
                                        <p>accept</p>
                                        <SiTicktick size={16}/>
                                    </div>

                                    <div className='flex items-center gap-2 bg-[#ebbeec] hover:bg-[#eab1eb] transition-colors duration-150 text-black px-2 py-1 rounded-2xl cursor-pointer w-full'>
                                        <p>reject</p>
                                        <RxCross2 size={18}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProfileTeamRequest
