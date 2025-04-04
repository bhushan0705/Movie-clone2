import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className=' flex items-center flex-col justify-evenly bg-black  border-3 border-amber-50'>
    <div className='flex gap-5 underline'>
      <Link to='/'>Home</Link>
      <Link to='#'>About</Link>
      <Link to='#'>Contact</Link>
    </div>
    <p className='text-sm'>Created by Bhushan</p>
    </footer>
  )
}

export default Footer