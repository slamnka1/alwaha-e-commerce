'use client'

import { Ruler } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface SizeGuideModalProps {
  sizeGuideImage?: string | null
  className?: string
}

export default function SizeGuideModal({
  sizeGuideImage,
  className,
}: SizeGuideModalProps) {
  const t = useTranslations('size-guide')

  // Default size guide image if none provided
  // const defaultSizeGuideImage = '/size-guide-default.jpg'
  // const imageUrl = sizeGuideImage || defaultSizeGuideImage
  if (!sizeGuideImage) {
    return null
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Ruler className="mr-2 h-4 w-4" />
          {t('button-text')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {t('title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Size Guide Image */}
          <div className="relative h-auto min-h-[400px] w-full overflow-hidden rounded-lg bg-gray-50">
            <img
              src={sizeGuideImage}
              alt={t('image-alt')}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-3 text-sm text-gray-700">
            <h3 className="text-base font-semibold">
              {t('instructions-title')}
            </h3>
            <ul className="list-inside list-disc space-y-2">
              <li>{t('instruction-1')}</li>
              <li>{t('instruction-2')}</li>
              <li>{t('instruction-3')}</li>
              <li>{t('instruction-4')}</li>
            </ul>
          </div>

          {/* Size Chart Table
          <div className="space-y-3">
            <h3 className="text-base font-semibold">{t('size-chart-title')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                      {t('size')}
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                      {t('chest-cm')}
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                      {t('hip-cm')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">XS</td>
                    <td className="border border-gray-300 px-3 py-2">80-85</td>
                    <td className="border border-gray-300 px-3 py-2">90-95</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">S</td>
                    <td className="border border-gray-300 px-3 py-2">85-90</td>
                    <td className="border border-gray-300 px-3 py-2">95-100</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">M</td>
                    <td className="border border-gray-300 px-3 py-2">90-95</td>
                    <td className="border border-gray-300 px-3 py-2">
                      100-105
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">L</td>
                    <td className="border border-gray-300 px-3 py-2">95-100</td>
                    <td className="border border-gray-300 px-3 py-2">
                      105-110
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">XL</td>
                    <td className="border border-gray-300 px-3 py-2">
                      100-105
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      110-115
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">XXL</td>
                    <td className="border border-gray-300 px-3 py-2">
                      105-110
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      115-120
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

          {/* Additional Tips */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 text-base font-semibold">{t('tips-title')}</h3>
            <p className="text-sm text-gray-700">{t('tips-content')}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
