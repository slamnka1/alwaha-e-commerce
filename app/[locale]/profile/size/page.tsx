import React from 'react'

import Image from 'next/image'

import { SetYourSizeImage } from '@/assets'

import SizeForm from './_components/size-form'

const SizePage = () => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-2/3 md:w-full max-w-lg">
          <Image
            alt="women enjoying mental health"
            className="mx-auto"
            src={SetYourSizeImage}
          />
        </div>
        <div className="w-full ">
          <SizeForm />
        </div>
      </div>
    </div>
  )
}

export default SizePage
