import React from 'react'

const UserCreditDetail = () => {
  return (
    <main className='h-[70vh] w-full bg-[url("/Images/user-action-bg.jpg")] bg-cover '>

    <div className='w-fit px-[50px] mx-auto sm:w-[95%] mt-12 border-[#333] border-[1px] h-fit py-12 flex flex-col gap-12 justify-center rounded bg-slate-50 align-middle'>
      <img src="/Images/cbLogo.png" className='w-[100px] h-[100px] self-center' />
      <h1 className='text-lg font-normal text-center text-gray-600 self-center'>Your 30 Days of Free Ad are Over, <br /> you will be Notified Upon any changes in plans.</h1>
    </div>
    </main>
  )
}

export default UserCreditDetail