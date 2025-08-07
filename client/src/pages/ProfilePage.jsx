import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import profile from "../assets/profile.png"
import { FiMessageSquare } from "react-icons/fi";
import { FaEdit , FaEye } from "react-icons/fa";
import { NavLink , Outlet , useParams , useLocation , useNavigate } from 'react-router-dom'
import UnderLine from '../utils/UnderLine';
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi';
import { useDispatch } from 'react-redux';
import { setUserLogout } from '../store/userSlice';
import toast from 'react-hot-toast'
import ProfileEdit from '../components/other/ProfileEdit';

const ProfilePage = () => {

  const user = useSelector(state => state.user)
  const params = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [path, setPath] = useState("")

  useEffect(() => {
    const arr = location.pathname.split("/")
    const endPoint = arr[arr.length - 1]
    setPath(endPoint)
  }, [location.pathname])

  const [editAbout, setEditAbout] = useState(false)

  console.log("profiee",user)


  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      })

      if (response?.data?.success) {
        dispatch(setUserLogout())
        localStorage.clear()

        toast.success(response?.data?.message)
        navigate("/")
      }

    } catch (error) {
      console.log("from handleLogout", error)
    }
  }


  return (
    <section className='bg-[#282932] text-white min-h-[calc(100vh-60px)] grid grid-cols-[500px_1fr]'>

      <div className='bg-[#21222b] px-6 py-4 min-h-[calc(100vh-70px)] max-h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto hide-scrollbar shadow-md shadow-[#282828]'>

        <div className='mt-4 ml-16 relative w-fit'>
          <img src={profile} alt="" className='h-[200px] w-[188px] rounded-2xl border-2 border-[#179709]' />
          <button className='absolute bottom-0 right-0 cursor-pointer text-white bg-[#137008] px-3 py-1.5 rounded-l-md rounded-r'>Edit</button>
        </div>

        <div className='ml-16 mt-4 flex gap-2 items-center max-w-[220px]'>
          <p className='block'>{user?.userId}</p>
          <div className='block h-[0.5px] w-full bg-[#b4b3b3]'></div>
        </div>

        <div className='ml-16 mt-6 max-w-[350px]'>

          <div className='flex items-center gap-x-1'>
            <p className='font-bold'>Email :</p>
            <p className='font-semibold'>{user?.email}</p>
          </div>

          <div>

            <div className='flex items-center gap-x-3 mt-4 mb-1'>
              {
                 user?.about ? (
                  <p className='font-bold bg-[#179709] w-fit px-1.5 py-0.5 rounded text-white'>About</p>
                 ) : (
                  <p onClick={()=>setEditAbout(true)} className='font-bold bg-[#179709] w-fit px-1.5 py-0.5 rounded text-white cursor-pointer'>add about</p>
                 )
              }
              
              <FaEdit onClick={()=>setEditAbout(true)} size={22} className={`text-[#484848] ${user?.about ? "cursor-pointer" : "pointer-events-none"} opacity-[70%]`} title='Edit about' />

            </div>

            {
              user?.about && (
                 <p>{user?.about}</p>
              ) 
            }
           
          </div>

        </div>

        <div className='mt-8 pl-16 '>

          <button onClick={handleLogout} className='block w-fit px-1.5 py-1 bg-[#bd1c1c] text-white rounded font-bold cursor-pointer'>Logout</button>

        </div>

      </div>

      <div className='overflow-y-auto  sticky top-[70px] px-8'>

        <div className=''>

          <h1 className='pt-[40px] font-bold text-[45px]'>{user?.name}</h1>
          <h2 className='font-semibold pl-1'>student</h2>

          <div className='pt-[35px] flex items-center gap-x-10 pb-[10px] '>

            <NavLink to={`/profile/${params?.user}`} className='flex items-center gap-x-1 cursor-pointer relative'>

              <FaEye size={20} />
              <p>Timeline</p>

              <div className='w-fit absolute -bottom-[15px] right-0 left-[24px]'>
                {/* {
                  path !== "edit" && (
                    <UnderLine size={'55px'} />
                  )
                } */}

              </div>

            </NavLink>

            {/* <NavLink to={`/profile/${params?.user}/edit`} className='flex items-center gap-x-1 cursor-pointer relative'>

              <FaEdit size={20} />
              <p>Edit profile</p>

              <div className='w-fit absolute -bottom-[15px] right-0 left-[24px]'>
                {
                  path === "edit" && (
                    <UnderLine size={'74px'} />
                  )
                }
              </div>

            </NavLink>

            <div className='flex items-center gap-x-1 cursor-pointer'>
              <FiMessageSquare size={20} />
              <p className='pb-1'>Message</p>
            </div> */}

          </div>

          <div className='border-b-[0.5px] border-b-[#b4b3b3] shadow-md'></div>

        </div>

        {
          <Outlet />
        }

      </div>


      {
        editAbout && (
          <ProfileEdit close={()=>setEditAbout(false)}/>
        )
      }

    </section>
  )
}

export default ProfilePage
