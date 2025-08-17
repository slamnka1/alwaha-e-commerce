import React from 'react'

import HeroSection from './_components/hero'
import Results from './_components/results'

type Props = {}

const SearchPage = (props: Props) => {
  return (
    <React.Fragment>
      <HeroSection />
      <Results />
    </React.Fragment>
  )
}

export default SearchPage
