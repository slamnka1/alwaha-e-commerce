'use client'

import React from 'react'

import Image from 'next/image'

import { LogoWithText, logo } from '@/assets'
import { Separator } from '@/components/ui/separator'

import LanguageSwitch from './language-switch'
import SearchInput from './search-input'
import UserButton from './user-button'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="absolute top-0 right-0 left-0 z-[10]">
      <div className="container py-4">
        <div className="rounded-2xl border border-[#F3E0C8] bg-white shadow-lg md:rounded-3xl">
          <div className="grid grid-cols-3 items-center p-2.5">
            <div className="lg:hidden">
              <LanguageSwitch />
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <LanguageSwitch />
              <Separator orientation="vertical" className="!h-8 bg-[#F3E0C8]" />
              <SearchInput />
            </div>
            <div className="flex items-center justify-center">
              <Image
                className="w-[235px] max-md:hidden"
                src={LogoWithText}
                alt="logo"
              />
              <Image className="w-10 md:hidden" src={logo} alt="logo" />
            </div>

            <div>
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
