import React from 'react'

import HeroSection from './_components/hero'
import ResultsWrapper from './_components/wrapper'

type Props = {}

const SearchPage = (props: Props) => {
  return (
    <React.Fragment>
      <HeroSection />
      <ResultsWrapper />
    </React.Fragment>
  )
}

export default SearchPage
