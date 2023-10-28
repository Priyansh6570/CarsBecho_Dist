import React from 'react'
import { Link } from 'react-router-dom'

const Error404Page = () => {
  return (
    <main className='h-[70vh] w-full bg-[url("/Images/user-action-bg.jpg")] bg-cover '>

    <div className='w-[60%] px-[50px] mx-auto sm:w-[95%] mt-12 border-[#333] border-[1px] h-fit py-12 flex flex-col gap-12 justify-center rounded bg-slate-50 align-middle'>
      <img src="/Images/cbLogo.png" className='w-[100px] h-[100px] self-center' />
      <h1 className='text-2xl text-center text-gray-600 font-bold self-center'>ERROR 404. <br /> Page Not Found</h1>
      <Link to="/" className="px-2 py-1 bg-[#ee3131] scale-150 text-white font-semibold text-center self-center">Home</Link>
    </div>
    </main>
  )
}

export default Error404Page