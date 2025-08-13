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
    <header>
      <div className="container pt-4">
        <div className="   shadow-lg md:p-1 rounded-2xl md:rounded-3xl border border-[#F3E0C8] ">
          <div className="grid grid-cols-3 items-center p-2">
            <div className="lg:hidden">
              <LanguageSwitch />
            </div>
            <div className="hidden lg:flex items-center gap-2 ">
              <LanguageSwitch />
              <Separator orientation="vertical" className="!h-8 bg-[#F3E0C8]" />
              <SearchInput />
            </div>
            <div className="flex items-center justify-center">
              <Image className="max-md:hidden" src={LogoWithText} alt="logo" />
              <Image className="md:hidden w-10" src={logo} alt="logo" />
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
