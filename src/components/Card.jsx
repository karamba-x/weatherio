import React from 'react'

const Card = ({ children }) => {
  return (
    <div className="relative w-full rounded-3xl  overflow-hidden">
      <div className="w-full h-full p-6 bg-teal-700">
        {children}
      </div>
    </div>
  )
}

export default Card