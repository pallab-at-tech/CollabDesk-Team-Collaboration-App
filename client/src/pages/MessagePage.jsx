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

const MessagePage = () => {

    const chat_details = useSelector(state => state.chat?.all_message)
    const location = useLocation().state
    const [messageText, setMessageText] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const messagesEndRef = useRef(null);


    const [messages, setMessages] = useState([])

    const { socketConnection } = useGlobalContext()


    const handleOnClick = async () => {

        if (!messageText.trim()) return

        socketConnection.emit("send_message", {
            senderId: user?._id,
            receiverId: location?.allMessageDetails?.otherUser?._id,
            text: messageText,
            image: "",
            video: "",
            other_fileUrl_or_external_link: {},
        })

        setMessageText("")

    }

    // fetch all messages
    useEffect(() => {

        (async () => {
            try {
                const response = await Axios({
                    ...SummaryApi.get_all_messages,
                    data: {
                        allMessageId: location?.allMessageDetails?.messages
                    }
                })

                const { data: responseData } = response

                if (responseData.success) {
                    setMessages(responseData?.data)
                }

            } catch (error) {
                console.log("error for fetching all messages", error)
            }

        })()
    }, [])

    console.log("current conversation details", chat_details)
    console.log("all fetchinfg messages", messages)

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

            <div className='h-full overflow-y-auto px-2 flex flex-col gap-2.5 py-4 chat-scrollbar' style={{ willChange: 'transform' }}>
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
                            <div key={`new key-${index}`} className={`bg-white w-fit text-base rounded text-neutral-900  px-1 py-0.5  ${isSelfMessage ? "self-end" : "self-start"}`}>
                                <p className='font-semibold'>
                                    {value?.text}
                                </p>

                                <p className='text-sm opacity-[60%]'>
                                    {indianTime}
                                </p>

                                <div ref={messagesEndRef} />
                            </div>
                        )
                    })
                }
            </div>


            <div className='bg-[#1f2029] w-full rounded-t-md grid grid-cols-[100px_1fr_100px] items-center text-white shadow-md shadow-[#154174]'>

                <div className='flex items-center justify-center cursor-pointer'>
                    <MdAttachment size={29} />
                </div>

                <div>
                    <input type="text" value={messageText}

                        onChange={e => setMessageText(e.target.value)}

                        className='w-full text-[#f3f3f3] outline-none' placeholder='Type a message...'
                    />
                </div>

                <div className='flex items-center justify-center cursor-pointer'>
                    <IoSendOutline size={29} onClick={() => handleOnClick()} />
                </div>

            </div>

        </section>
    )
}

export default MessagePage
