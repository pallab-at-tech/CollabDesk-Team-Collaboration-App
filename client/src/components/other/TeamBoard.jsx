import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGlobalContext } from '../../provider/GlobalProvider'
import { useEffect } from 'react'
import { IoIosPersonAdd } from "react-icons/io";

const TeamBoard = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)

    const { fetchTeamDetails } = useGlobalContext()

    useEffect(() => {
        fetchTeamDetails(params?.team)
    }, [params])

    console.log("team all details...", team)


    return (
        <section className='h-full'>

            <div className='flex items-center justify-between mx-10 px-6 py-2 mt-2 mb-1  rounded-t' style={{ backgroundColor: "rgb(152 168 103 / 52%)" }}>

                <div className='flex flex-col'>
                    <div className='flex gap-x-1 items-center'>
                        <h1 className='font-bold text-2xl text-[#191a19]'>{team?.name}</h1>
                        <h2 className='text-lg font-semibold text-[#191a19] select-none'>{`( ${team?.organization_type} )`}</h2>
                    </div>

                    <div>
                        <p className='text-[#2a342c] text-base'>{team?.description}</p>
                    </div>
                </div>

                <div className='flex gap-x-6'>

                    <div className='cursor-pointer' title='add member'>
                        <IoIosPersonAdd size={32}/>
                    </div>

                    <p className='bg-[#2e322e] px-3 text-white py-1 rounded-md cursor-pointer'>edit</p>
                    
                </div>
                
            </div>

            <div className='max-h-[calc(100vh-150px)] min-h-[calc(100vh-150px)] overflow-y-auto bg-B-color mx-10 rounded-b '>
                
            </div>

        </section>
    )
}

export default TeamBoard
