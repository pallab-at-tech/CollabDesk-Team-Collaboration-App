import React from 'react'
import { useSelector } from 'react-redux'
import student from "../assets/test-student-banner1.png"
import engineering from "../assets/engineering-banner.png"
import Healthcare from "../assets/Healthcare-banner.png"
import government from "../assets/government-banner.png"
import manufacture from "../assets/manufacture-banner.png"
import other from "../assets/other-banner.png"
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const CollabBoard = () => {

  const user = useSelector(state => state.user)

  const bannerCombo = {
    "Engineering-IT": engineering,
    "Student": student,
    "Healthcare-Dept": Healthcare,
    "Government employee": government,
    "Manufacturing-Dept": manufacture,
    "other": other
  }
  const boardURL = `/board/${user?.name}-${user?._id}`



  return (
    <section className='bg-[#fcfcfc] min-h-[calc(100vh-60px)] px-[50px] py-4 grid grid-cols-[1fr_500px]'>

      <div className='h-[calc(100vh-112px)] overflow-y-hidden' style={{ willChange: 'transform' }}>
        {
          <Outlet />
        }
      </div>

      <div className='pl-4 scroll-smooth'>

        <h1 className='text-center font-bold py-4 text-3xl text-[#024f13]'>All TEAM</h1>

        <div className='flex flex-wrap justify-center gap-6 border-l-4 border-l-[#071e0e58] pl-4 h-[calc(100vh-180px)] overflow-y-auto' style={{ willChange: 'transform' }}>

          {
            user?.roles?.map((v, i) => {
              return (
                <Link to={`${boardURL}/${v?.teamId}`} key={`${boardURL}/${v?.teamId}`} className='min-h-[120px] max-h-[120px] w-[90%] bg-B-color rounded p-2 pl-4 relative cursor-pointer z-10'>
                  <img src={bannerCombo[`${v?.organization_type}`]} alt="" className='h-[95%] absolute right-0 bottom-0 -z-50' />
                  <h1 className='text-xl font-bold'>{v?.name}</h1>
                  <p className='text-base text-black/70 font-semibold'>{`${v.organization_type} ${v.organization_type === "other" ? "" : "Group"}`}</p>
                </Link>
              )
            })
          }

        </div>

      </div>

    </section>
  )
}

export default CollabBoard

