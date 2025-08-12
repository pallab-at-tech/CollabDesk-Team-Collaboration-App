import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { setUserDetails, onlineUserDetails } from '../store/userSlice'
import { setTeamDetails } from '../store/teamSlice'
import { setTask } from '../store/taskSlice'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

export const GlobalContext = createContext(null)
export const useGlobalContext = () => useContext(GlobalContext)



const GlobalProvider = ({ children }) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [socketConnection, setSocketConnection] = useState(null)


    const fetchUserAllDetails = async () => {
        try {

            const response = await Axios({
                ...SummaryApi?.user_deatails
            })

            const { data: responseData } = response

            if (responseData?.success) {
                dispatch(setUserDetails(responseData?.data))
                localStorage.setItem('login', 'true');
            }
            else {
                localStorage.setItem('login', 'false');
            }

        } catch (error) {
            localStorage.setItem('login', 'false');
            console.log("error from global provider", error)
        }
    }

    const fetchIsLogin = () => {
        const login = localStorage.getItem("login")
        return login === "true"
    }

    const fetchTeamDetails = async (teamId) => {

        try {
            const response = await Axios({
                ...SummaryApi.team_details,
                params: {
                    teamId,
                }
            })

            const { data: responseData } = response

            if (responseData?.error) {
                toast.error(responseData?.message)
            }

            if (responseData?.success) {
                dispatch(setTeamDetails(responseData?.data))
            }

        } catch (error) {
            console.log("error for fetchTeamDetails", error)
        }
    }

    const fetchTaskDetails = async (teamId) => {
        try {

            const response = await Axios({
                ...SummaryApi.task_details,
                params: {
                    teamId: teamId
                }
            })

            const { data: responseData } = response

            if (responseData?.error) {
                toast.error(responseData?.message)
            }

            if (responseData?.success) {
                dispatch(setTask(responseData?.data))
            }

        } catch (error) {
            console.log("error occur for fetchTaskDetails", error)
        }
    }

    useEffect(() => {
        fetchUserAllDetails();
    }, []);

    useEffect(() => {
        fetchIsLogin()
    }, [fetchUserAllDetails])


    // socket configure in client site
    useEffect(() => {

        if (user?._id) {

            console.log("testing user id ", user?._id)

            const socket = io(import.meta.env.VITE_BACKEND_URL, {
                withCredentials: true
            });

            setSocketConnection(socket)

            socket.emit("join_room", user._id);

            socket.on("online_user", (onlineUsers) => {
                dispatch(onlineUserDetails({ onlineUser: onlineUsers }));
            });

            // Cleanup on unmount
            return () => {
                socket.off("connect");
                socket.off("online_user");
                socket.disconnect();
            };
        }
        else{
            return;
        }

    }, [user?._id , dispatch])

    console.log("user from global provider", user)

    return (
        <GlobalContext.Provider value={{ fetchUserAllDetails, fetchIsLogin, fetchTeamDetails, fetchTaskDetails , socketConnection  }}>
            {
                children
            }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
