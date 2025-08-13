import React, { useEffect, useRef, useState } from 'react'
import { IoSendOutline } from "react-icons/io5";
import { MdAttachment } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdManageSearch } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { updateConversationWithNewMessage } from '../store/chatSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaFileAlt } from "react-icons/fa";
import { RiFolderVideoFill } from "react-icons/ri";
import { IoImage } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import uploadFile from '../utils/uploadFile';

const MessagePage = () => {

    const chat_details = useSelector(state => state.chat?.all_message)
    const location = useLocation().state

    const imgRef = useRef()
    const videoRef = useRef()
    const fileUrlRef = useRef()
    const [messageText, setMessageText] = useState("")
    const [attachData, setAttachData] = useState({
        image: "",
        video: "",
        other_fileUrl_or_external_link: "",
    })

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const messagesEndRef = useRef(null);
    const params = useParams()



    const [messages, setMessages] = useState([])
    const [openAttach, setOpenAttach] = useState(false)
    const attachRef = useRef(null)

    const { socketConnection } = useGlobalContext()

    const handleAllAtachFile = async (e) => {

        const { name } = e.target
        const file = e.target.files?.[0]

        if (!file) return

        const response = await uploadFile(file)

        console.log("responsr from handleAllAtachFile", response)

        setAttachData((preve) => {
            return {
                ...preve,
                [name]: response?.secure_url
            }
        })

        setOpenAttach(false)
    }

    const handleOnClick = async () => {

        if (!messageText.trim() && !attachData.image && !attachData.video && !attachData.other_fileUrl_or_external_link.trim()) return

        socketConnection.emit("send_message", {
            senderId: user?._id,
            receiverId: location?.allMessageDetails?.otherUser?._id,
            text: messageText,
            image: attachData.image,
            video: attachData.video,
            other_fileUrl_or_external_link: attachData.other_fileUrl_or_external_link,
        })

        setMessageText("")
        setAttachData({
            image: "",
            video: "",
            other_fileUrl_or_external_link: ""
        })

        const matchingChats = chat_details?.filter(chat =>
            chat.group_type === "PRIVATE" &&
            chat.participants?.some(p => p._id?.toString() === params?.conversation)
        );

        console.log("matchingChats", matchingChats)

    }

    // fetch all messages
    useEffect(() => {

        (async () => {
            try {

                const matchingChats = chat_details?.filter(chat =>
                    chat.group_type === "PRIVATE" &&
                    chat.participants?.some(p => p._id?.toString() === params?.conversation)
                );



                const response = await Axios({
                    ...SummaryApi.get_all_messages,
                    data: {
                        allMessageId: matchingChats[0]?.messages
                    }
                })

                const { data: responseData } = response

                if (responseData.success) {
                    setMessages(responseData?.data)
                }

            } catch (error) {
                setMessages([])
                console.log("error for fetching all messages", error)
            }

        })()
    }, [params?.conversation])


    // recieved message and update globally [ all chat member ]
    useEffect(() => {
        if (!socketConnection) return;

        socketConnection.on("receive_message", (data) => {
            console.log("yep this is message data", data);
            dispatch(updateConversationWithNewMessage({ conversation: data.conversation, message: data?.message }))
            setMessages(prev => [...prev, data?.message]);
        });

        return () => {
            socketConnection.off("receive_message");
        };
    }, [socketConnection]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (attachRef.current && !attachRef.current.contains(event.target)) {
                setOpenAttach(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    console.log("attachData", attachData)

    console.log("all state upate value from redux", chat_details)
    console.log("state updated message", messages)



    return (
        <section className='h-[calc(100vh-60px)] w-full grid grid-rows-[65px_1fr_55px]'>

            <div className='bg-[#21222b] px-4 grid grid-cols-[300px_1fr] w-full items-center text-white shadow-md shadow-[#57575765]'>

                <div className='flex gap-2.5 pl-2'>
                    <div className='flex items-center justify-center'>
                        <RxAvatar size={38} />
                    </div>

                    <div className='flex flex-col leading-tight text-base items-start'>
                        <p>{location?.allMessageDetails?.otherUser?.name}</p>
                        <p>{location?.allMessageDetails?.otherUser?.userId}</p>
                    </div>
                </div>

                <div className='flex items-center justify-end'>
                    <MdManageSearch size={30} className='cursor-pointer' />
                </div>
            </div>

            <div className='h-full overflow-y-auto px-2.5 flex flex-col gap-2.5 py-4 chat-scrollbar' style={{ willChange: 'transform' }}>
                {
                    Array.isArray(messages) && messages.map((value, index) => {

                        const isSelfMessage = value?.senderId?._id === user?._id || value?.senderId === user?._id
                        const date = new Date(value?.createdAt)
                        const indianTime = date.toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            hour: "2-digit",
                            minute: "2-digit",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        })

                        return (
                            <div key={`new key-${index}`} className={`bg-[#f1f1f1] w-fit text-base rounded text-blue-950  px-1 py-0.5  ${isSelfMessage ? "self-end" : "self-start"}`}>

                                <div>
                                    {
                                        value?.image && <img src={value?.image} alt="" className='h-[200px]' />
                                    }

                                    {
                                        value?.video && <video src={value?.video} controls className='h-[200px]'></video>
                                    }

                                    {/* {
                                        value?.other_fileUrl_or_external_link && <embed src={value?.other_fileUrl_or_external_link} type="application/pdf" className='h-[100px]'/>
                                    } */}

                                    {value?.other_fileUrl_or_external_link && (
                                        <button
                                            onClick={() => window.open(value.other_fileUrl_or_external_link, "_blank")}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Open PDF
                                        </button>
                                    )}
                                </div>
                                <p className='font-semibold'>
                                    {value?.text}
                                </p>

                                <p className='text-sm opacity-[60%]  text-end'>
                                    {indianTime}
                                </p>

                                <div ref={messagesEndRef} />
                            </div>
                        )
                    })
                }
            </div>


            <div className='bg-[#1f2029] w-full rounded-t-md grid grid-cols-[100px_1fr_100px] items-center text-white shadow-md shadow-[#154174]'>

                <div className='flex items-center justify-center relative'>
                    <MdAttachment size={29} onClick={() => setOpenAttach(true)} className='cursor-pointer' />

                    {
                        openAttach && (
                            <div ref={attachRef} className='bg-[#f1f1f1] text-blue-950 absolute bottom-10 left-8 min-h-[110px] min-w-[100px] flex flex-col items-start px-4 gap-2 py-2 rounded-t-2xl rounded-r-2xl rounded-l-md'>

                                <div className='flex gap-4 items-center justify-center'>

                                    <div onClick={() => {
                                        imgRef.current.click()
                                    }}
                                        className='cursor-pointer'
                                    >
                                        <IoImage size={42} />
                                        <p >image</p>
                                        <input ref={imgRef} onChange={handleAllAtachFile} type="file" accept="image/*" name='image' hidden />
                                    </div>

                                    <div onClick={() => videoRef.current.click()}
                                        className='cursor-pointer'
                                    >
                                        <RiFolderVideoFill size={42} />
                                        <p className='text-center'>video</p>
                                        <input type="file" ref={videoRef} onChange={handleAllAtachFile} accept="video/*" name='video' hidden />
                                    </div>
                                </div>

                                <div className='flex gap-4 items-start justify-center'>
                                    <div onClick={() => fileUrlRef.current.click()} className='cursor-pointer'>
                                        <FaFileAlt size={42} />
                                        <p className='text-center'>file</p>
                                        <input type="file" ref={fileUrlRef} onChange={handleAllAtachFile} accept="application/pdf" name='other_fileUrl_or_external_link' hidden />
                                    </div>

                                    {/* <div className='cursor-pointer'>
                                        <HiOutlineUserGroup size={42}/>
                                        <p className='leading-[1] text-center'>Create group</p>
                                    </div> */}
                                </div>
                            </div>
                        )
                    }
                </div>

                <div>
                    <input type="text" value={messageText}

                        onChange={e => setMessageText(e.target.value)}

                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleOnClick();
                            }
                        }}

                        className='w-full text-[#f3f3f3] outline-none' placeholder='Type a message...'
                    />
                </div>

                <div className='flex items-center justify-center cursor-pointer'>
                    <IoSendOutline size={29} onClick={() => handleOnClick()} />
                </div>

            </div>

            {
                attachData.image && (
                    <section className='fixed right-0 left-0 top-0 bottom-[58px] flex flex-col items-center justify-center z-50 bg-gray-800/75'>
                        <img src={attachData.image} alt="" className='h-[300px]' />
                    </section>
                )
            }

            {
                attachData?.video && (
                    <section className='fixed right-0 left-0 top-0 bottom-[58px] flex flex-col items-center justify-center z-50 bg-gray-800/75'>
                        <video src={attachData.video} className='h-[350px]' controls></video>
                    </section>
                )
            }

        </section>
    )
}

export default MessagePage
