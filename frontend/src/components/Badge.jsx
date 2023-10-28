import React from 'react'

export const Badge = () => {
  return (
    <main className='flex items-center'>
    <span className="badge flex sm:hidden left-[1rem] gap-2 items-center bg-[#000000] rounded-2xl py-1 px-2">
    <img src={'/Images/cbGold.png'} alt="carsbecho Logo" className='w-[16px]' />
              <span className="badge_text text-sm font-bold text-[#eee831] uppercase">Warranty</span>
    </span>
    </main>
  )
}

export const BadgeMobile = () => {
  return (
    <main>
    <span className="badge absolute top-[8.5rem] scale-90 left-[1rem] sm:flex hidden gap-2 items-center bg-[#000000] rounded-2xl py-1 px-2">
              <img src={'/Images/cbGold.png'} alt="carsbecho Logo" className='w-[16px]' />
              <span className="badge_text text-sm font-bold text-[#eee831] uppercase">Warranty</span>
    </span>
    </main>
  )
}