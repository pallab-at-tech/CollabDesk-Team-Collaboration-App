import React, { createContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { setUserDetails } from '../store/userSlice'

export const GlobalContext = createContext(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const fetchUserAllDetails = async () => {
        try {

            const response = await Axios({
                ...SummaryApi.user_deatails
            })

            const { data: responseData } = response

            if (responseData?.success) {
                dispatch(setUserDetails(responseData?.data))
            }

        } catch (error) {
            console.log("error from global provider", error)
        }
    }

    useEffect(()=>{
        fetchUserAllDetails()
    },[])
    
    console.log("user from global provider",user)


    return (
        <GlobalContext.Provider value={{fetchUserAllDetails}}>
            {
                children
            }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
