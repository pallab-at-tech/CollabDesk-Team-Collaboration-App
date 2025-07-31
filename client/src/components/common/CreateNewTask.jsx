import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../provider/GlobalProvider'
import { IoClose } from "react-icons/io5";
import { FaRegChartBar } from "react-icons/fa6";

const CreateNewTask = ({ columnId, close, columnName }) => {


    const params = useParams()
    const imgRef = useRef()
    const videoRef = useRef()
    const [data, setData] = useState({
        teamId: params?.team,
        columnId: columnId,
        title: "",
        description: "",
        assignTo: "",
        status: "",
        aditional_link: [],
        dueDate: "",
        labels: [],
        date: "",
        time: "",
        image: "",
        video: ""
    })
    const { fetchTaskDetails } = useGlobalContext()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }

        })
    }

    console.log("para00", params)

    return (
        <section className='fixed right-0 left-0 top-0 bottom-0 flex flex-col items-center justify-center z-50 bg-gray-800/70'>

            <div className=' bg-[#dbdbdb] rounded  px-1 relative'>

                <div className='float-end p-2'>
                    <IoClose size={24} onClick={() => close()} className='cursor-pointer' />
                </div>

                <h1 className='text-2xl font-bold text-center py-2'>Column : {columnName}</h1>

                <form className='grid grid-cols-[5fr_3fr] px-4 py-4'>

                    <div className='flex flex-col gap-4 justify-center'>

                        <div className='group text-lg'>
                            <p className='font-semibold group-hover:scale-y-105 transition-all duration-500 group-hover:-translate-y-1'>Title : </p>
                            <input type="text" onChange={handleChange} name='title' value={data.title} required placeholder='type name here....' className=' w-[300px]  h-8 text-base outline-none p-2 mt-0.5 text-[#100f0f]' />
                        </div>

                        <div className='group text-lg'>

                            <div className='flex gap-2'>

                                <FaRegChartBar size={26} />

                                <p className='font-semibold group-hover:scale-y-105 transition-all duration-500 group-hover:-translate-y-1'>
                                    Description :
                                </p>

                            </div>

                            <textarea name="description" onChange={handleChange} value={data.description} placeholder='Describe your task...' className='w-[300px]  max-h-[70px] min-h-[70px]  text-base outline-none p-2 mt-0.5 text-[#100f0f]' />

                        </div>

                        <div className='border-t-2 border-[#696969] min-h-0.5 w-full'>

                        </div>

                        <div className='text-lg'>

                            <p className='font-semibold'>Set DeadLine : </p>

                            <div className='flex items-center gap-4 mb-1'>

                                <div className='group text-base '>

                                    <p className='font-semibold text-red-600 group-hover:scale-y-105 transition-all duration-500 group-hover:-translate-y-1'>Date  : </p>

                                    <input type="date"
                                        onChange={(e) => {
                                            const { value } = e.target

                                            setData((preve) => {
                                                return {
                                                    ...preve,
                                                    date: value,
                                                    dueDate: `${value} - ${preve.time}`
                                                }

                                            })
                                        }}
                                        name='date' value={data.date} required placeholder='type name here....'
                                        className=' w-[140px]  h-8 text-base outline-none p-2 mt-0.5 text-[#100f0f]'
                                    />

                                </div>

                                <div className='group text-lg '>

                                    <p className='font-semibold text-red-600 group-hover:scale-y-105 transition-all duration-500 group-hover:-translate-y-1'>Time : </p>

                                    <input type="time"
                                        onChange={(e) => {
                                            const { value } = e.target

                                            setData((preve) => {
                                                return {
                                                    ...preve,
                                                    time: value,
                                                    dueDate: `${preve.date} - ${value}`
                                                }

                                            })
                                        }}
                                        name='time'
                                        value={data.time} placeholder='type name here....'
                                        className=' w-[150px]  h-8 text-base outline-none p-2 mt-0.5 text-[#100f0f]'
                                    />

                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='pl-[20%] flex flex-col gap-4'>

                        <div className='group text-lg'>
                            <p className='font-semibold group-hover:scale-y-105 transition-all duration-500 group-hover:-translate-y-1'>Assign to : </p>
                            <input type="text" onChange={handleChange} name='assignTo' value={data.assignTo} placeholder='type userId....' className='w-[90%] bg-gray-400 h-8 text-base outline-none p-2 mt-0.5 text-[#100f0f]' />
                            <p className='text-sm text-[#7b7b7b] leading-4 pt-1'>By default it's set to all memeber</p>
                        </div>


                        {/* add image */}
                        <div className='group text-lg'>

                            <p onClick={() => imgRef.current.click()} className='bg-[#f05050] text-white text-base w-[90%] text-center px-1 py-1 rounded cursor-pointer'>Add image</p>
                            <input type="file" ref={imgRef} accept="image/*" name='image' className='hidden' />

                        </div>

                        {/* add video */}
                        <div className='group text-lg'>

                            <p onClick={() => videoRef.current.click()}  className='bg-[#f05050] text-white text-base w-[90%] text-center px-1 py-1 rounded cursor-pointer'>Add video</p>
                            <input type="file" ref={videoRef} accept="video/*" name='video' className='hidden' />

                        </div>

                        {/* add link */}
                        <div className='group text-lg'>
                            <div className='bg-[#f05050] text-white text-base w-[90%] text-center px-1 py-1 rounded cursor-pointer'>Add Link</div>
                        </div>

                        <button className='bg-[#027d2b] hover:bg-[#027127] transition-colors duration-100 text-white w-[90%] py-2.5 px-2 rounded font-bold mt-[3%]'>Create Task</button>

                    </div>

                </form>

            </div>

        </section>
    )
}

export default CreateNewTask
