import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import {Link, useHistory} from 'react-router-dom'

const Become_Partners = () => {
  const history = useHistory()
  return (
    <main className='md:h-[1080px] h-[100%] w-full z-[10000] py-24 p-0 bg-[#10163a] absolute top-0 overflow-hidden'>
      {/* back Link  */}
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <Link
          className="bg-[#ffffff20] rounded-full p-2"
          onClick={() => history.push('/account')}
        >
          <span className="material-icons align-middle text-xl">
            <IoIosArrowBack className='text-white' />
          </span>
        </Link>
      </div>

      {/* main-container  */}
      <div className="h-full w-full flex flex-col justify-between py-8 px-4">
        {/* heading */}
        <div className="text-center mt-8">
          <img src="/Images/cbGold.png" alt="" className='w-[40%] max-w-[200px] mx-auto mb-4' loading="lazy"  />
          <h1 className="text-3xl font-semibold text-[#f6f6f6]">
            Become Our Partners
          </h1>

          <p className="text-[#f2f2f2cf] mt-2 text-base p-2">
            We are always looking for new partners to join our network.
          </p>

        </div>

        {/* plan cards  */}
        <div className="cards flex w-[90%] md:w-full p-8 mx-auto gap-8 md:flex-col ">

        <div className="dealer_card flex-1 flex p-8 bg-gradient-to-bl from-red-500 to-transparent rounded-xl shadow-lg">
            <div className="heading_and_description w-[70%] h-full flex flex-col justify-between gap-8 items-start">
              <div className="">
              <h1 className='text-white font-semibold text-3xl'>Dealer Plans</h1>
              <p className='text-xl font-semibold text-white'>50% Extra</p>
              <p className='text-xs text-[#ffffffb9]'>SPECIAL OFFER ENDS ON</p>
              <p className='text-xs text-white'>July 14th, 2023 at 23:59</p>
              </div>

              <div className="view_all_plans">
                <Link to={'/dealer/subscription'} className='text-[#ddd03f] bg-[#0000001d] shadow-sm shadow-[#fff645] py-2 px-4 rounded-lg text-sm font-semibold'>View All Plans</Link>
              </div>
            </div>

            <div className="plan_icon w-[40%] h-full flex justify-center items-center">
              <img src="/Images/planGold.png" alt="" className=' scale-125' loading="lazy"  />
            </div>
          </div>

          <div className="broker_card flex-1 flex p-8 bg-gradient-to-bl from-cyan-500 to-transparent rounded-xl">
            <div className="heading_and_description w-[70%] h-full flex flex-col justify-between gap-8 items-start">
              <div className="">
              <h1 className='text-white font-semibold w-[300px] text-2xl'>CarsBecho Authentic Broker Plans</h1>
              </div>

              <div className="view_all_plans">
                <Link to={'/broker/subscription'} className='text-[#17e9f4] bg-[#0000001d] shadow-sm shadow-[#4af2fb] py-2 px-4 rounded-lg text-sm font-semibold'>View Plan</Link>
              </div>
            </div>

            <div className="plan_icon w-[40%] h-full flex justify-center items-center">
              <img src="/Images/brokerplan.png" alt="" className=' scale-1' loading="lazy"  />
            </div>
          </div>

          <div className="broker_card flex-1 flex border-[1px] border-[#1145ff80] p-8 bg-gradient-to-tr from-[#161543] to-[#142243] rounded-xl">
            <div className="heading_and_description w-[70%] h-full flex flex-col justify-between gap-8 items-start">
              <div className="">
              <h1 className='text-white font-semibold w-[300px] text-2xl'>Free Trial Package</h1>
              </div>

              <div className="view_all_plans">
                <Link to={'/free/trial'} className='text-[#56f9ff] bg-[#0000001d] shadow-sm shadow-[#4afba5] py-2 px-4 rounded-lg text-sm font-semibold'>View Plan</Link>
              </div>
            </div>

            <div className="plan_icon w-[40%] h-full flex justify-center items-center">
              <img src="/Images/free_trial.png" alt="" className=' scale-1' loading="lazy"  />
            </div>
          </div>

          </div>
      </div>
      
    </main>
  )
}

export default Become_Partners