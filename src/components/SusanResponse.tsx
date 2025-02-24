import React from 'react'
import susan from "../assets/susan.jpg"

interface SusanResponseProps {
  text: string;
  children?: React.ReactNode;
}


const SusanResponse = ({ text, children }: SusanResponseProps): JSX.Element => {
  return (
    <div className='grid grid-cols-1 gap-2 py-3 md:grid-cols-[max-content_minmax(0,1fr)] md:gap-4'>

      {/* ai old lady avatar */}
      <figure className='grid place-items-center w-10 h-10'>
        <img
          src={susan}
          alt='Ai image'
          width={35}
          height={35}
          className='rounded-full'
        />
      </figure>

      {children}

      {/* ai response */}
      <div className='md-content'>
        {text}
      </div>
    </div>
  )
}

export default SusanResponse
