import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-4 gap-3 '>
    <div className='bg-red-500 rounded-lg shadow-xl min-h-[50px]' />
    <div className='bg-orange-500 rounded-lg shadow-xl min-h-[50px] col-span-3' />
    <div className='bg-yellow-500 rounded-lg shadow-xl min-h-[50px] row-span-2 col-span-2' />
    <div className='bg-green-500 rounded-lg shadow-xl min-h-[50px]' />
    <div className='bg-teal-500 rounded-lg shadow-xl min-h-[50px]' />
    <div className='bg-blue-500 rounded-lg shadow-xl min-h-[50px]' />
    <div className='bg-indigo-500 rounded-lg shadow-xl min-h-[50px]' />
    <div className='bg-purple-500 rounded-lg shadow-xl min-h-[50px]' />
    <div className='bg-pink-500 rounded-lg shadow-xl min-h-[50px]' />
    <div className='bg-slate-500 rounded-lg shadow-xl min-h-[50px]' />
    </div>
  )
}

export default page