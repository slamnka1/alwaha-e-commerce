import { Loader2 } from 'lucide-react'

import React from 'react'

type Props = {}

const PageLoader = (props: Props) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2
        strokeWidth={1.5}
        className="text-primary size-10 animate-spin"
      />
    </div>
  )
}

export default PageLoader
