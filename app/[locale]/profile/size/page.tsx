import React from 'react'

import Image from 'next/image'

import { SetYourSizeImage } from '@/assets'

import SizeForm from './_components/size-form'

const SizePage = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center gap-10 pt-10 md:flex-row">
        <div className="w-2/3 max-w-lg md:w-full">
          <Image
            alt="women enjoying mental health"
            className="mx-auto"
            src={SetYourSizeImage}
          />
        </div>
        <div className="w-full">
          <SizeForm />
        </div>
      </div>
    </div>
  )
}

export default SizePage
