import React, { useEffect, useState } from 'react'
import noTask from "../../assets/no-task.png"
import { useParams } from 'react-router-dom'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useGlobalContext } from '../../provider/GlobalProvider'

const MainTeamBoard = () => {

    const [data, setData] = useState({
        name: ""
    })
    const params = useParams()

    const { fetchTaskDetails } = useGlobalContext()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.taskBoard_create,
                data: {
                    name: data.name,
                    teamId: params.team
                }
            })

            if (response?.data?.error) {
                toast.error(response?.data?.message)
            }

            if (response?.data?.success) {
                toast.success(response?.data?.message)
                setData({
                    name: ""
                })
            }

        } catch (error) {
            console.log("create task board error", error)
        }
    }

    useEffect(() => {
        fetchTaskDetails(params?.team)
    }, [])

    const task = useSelector(state => state.task)

    console.log("task details", task)


    return (
        <section>

            <div className='max-h-[calc(100vh-130px)] p-6 min-h-[calc(100vh-130px)] overflow-y-auto bg-B-color mini_tab:mx-10 rounded-b relative'>

                {
                    !task?._id && (
                        <form onSubmit={handleOnSubmit} className='ipad_pro:mx-10 ipad_pro:my-4 mini_tab:mx-6 mini_tab:my-4'>

                            <h1 className='font-bold mini_tab:text-[20px] text-[16px] text-[#111211] w-fit'>Enter name to create task Board :</h1>

                            <input type="text" name='name' value={data.name} onChange={handleOnChange} className='bg-[#6f6f6f90] mini_tab:w-[311px] w-[249px] mb-2 mt-1 outline-none rounded mini_tab:py-1.5 py-1 px-2' placeholder='Enter here ...' />

                            <button className='bg-A-off-color hover:bg-[#015f20] transition-colors text-A-off-text w-fit mini_tab:px-3 mini_tab:py-1.5 px-2 py-1 rounded cursor-pointer block'>Create</button>

                        </form>
                    )
                }


                {
                    !task?._id && (
                        <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                            <img src={noTask} alt="No task" className='opacity-[40%]' />
                            <p className='text-gray-700'>No task create yet !?</p>
                        </div>
                    )
                }



            </div>



        </section>
    )
}

export default MainTeamBoard
