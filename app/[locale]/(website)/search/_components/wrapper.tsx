import { DynamicPagination } from '@/components/ui/dynamic-pagination'

import Filters from './filters'
import Results from './results'

const ResultsWrapper = () => {
  return (
    <div className="container py-16">
      <div className="flex gap-8">
        <div className="w-full">
          <Results />
        </div>
        <Filters />
      </div>
      <div className="flex justify-center">
        <DynamicPagination totalPageCount={10} />
      </div>
    </div>
  )
}

export default ResultsWrapper
