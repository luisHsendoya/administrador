import React from 'react'

function Error({children}) {
  return (
    <div className='text-center my-4 bg-red-600 text-white'>{children}</div>
  )
}

export default Error