import React from 'react'
import phone from "../assets/phone.png"
import person from "../assets/collab-person.png"

const Home = () => {
  return (
    <section className='bg-gradient-to-t to-[var(--primary-color)] from-[#aab8ed] lg_md:min-h-[calc(100vh-60px)] min-h-[110vh] relative '>

      <div className=''>

        <div className='lg-real:p-[4%] lg_md:pl-[140px] lg-real:max-w-[75%] w-full lg_md:px-[15%] md:px-[10%] md:py-[8%]'>


          <h1 className='md:text-5xl font-bold mb-3 leading-[1.2] text-[#000727]'>Streamline Your Workflow - Collaborate in Real Time with CollabDesk</h1>
          <p className='md:text-lg font-semibold text-[#000312]'>Empower your team to work smarter, faster, and together - wherever they are. </p>

          <div className='lg-real:mt-[35px] mini_tab:mt-[50px] flex items-center lg-real:justify-start mini_tab:justify-center  gap-4'>
            <input type="email" placeholder='Enter email...' className='w-[310px] bg-white py-[9px] rounded px-1.5 outline-[#00061d]' />
            <button className='block bg-[#005eff] py-[9px] px-2 rounded text-white transition-all duration-150 hover:bg-[#0055e8] hover:scale-105 cursor-pointer text-center'>get started</button>
          </div>

          <div className='pt-3 lg-real:block md:flex items-center lg-real:justify-start mini_tab:justify-center  text-sm leading-[1.2] text-[#000312]'>By entering my email, I acknowledge the <span className='underline font-semibold cursor-pointer'> CollabBoard Privacy Policy</span></div>

        </div>

        {/* for window version */}
        <div className='lg-real:block hidden'>
          {/* banner img */}

          <div className='absolute top-[30px] right-0'>

            <div className='w-fit'>

              <img src={phone} alt="" className='h-[75vh]' />
              <img src={person} alt="" className='absolute top-[250px] left-[30px] h-[45vh]' />

            </div>
          </div>

        </div>

        {/* for mobile and tab version */}
        <div className=' flex justify-center lg-real:hidden  w-full'>

          <div className='w-fit relative'>
            <img src={phone} alt="" className='h-[55vh]' />
            <img src={person} alt="" className='absolute top-[360px] left-[50px] h-[35vh] lg-real:hidden ' />
          </div>

        </div>

      </div>

    </section>
  )
}

export default Home
