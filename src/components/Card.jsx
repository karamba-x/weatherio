import React from 'react'

const Card = ({ children }) => {
  return (
    <div className="relative w-full rounded-3xl h-[300px] overflow-hidden">
      {/* <div className="absolute bg-orange-500/50 h-16 w-16 p-4 rounded-full blur-2xl top-0 left-0" />
      <div className="absolute bg-cyan-500/20 h-64 w-64 p-4 rounded-full blur-2xl top-5 left-5" />
      <div className="absolute bg-cyan-500/50 h-32 w-32 p-4 rounded-full blur-2xl top-10 right-10" />
      <div className="absolute mix-blend-multiply bg-cyan-400/20 h-32 w-32 p-4 rounded-full blur-2xl bottom-10 left-1/2 transform -translate-x-1/2" />
      <div className="absolute mix-blend-multiply bg-blue-400/10 h-64 w-64 p-4 rounded-full blur-2xl top-10 left-1/3 transform -translate-x-1/2" />
      <div className="absolute bg-indigo-500/10 h-64 w-64 p-4 rounded-full blur-2xl top-10 right-1/4" /> */}
      <div className="bg-gradient-to-r from-cyan-500/15 to-blue-300/15 w-full h-full p-4">
        {children}
      </div>
    </div>
  )
}

export default Card