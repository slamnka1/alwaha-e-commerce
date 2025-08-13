'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { girls } from '@/assets'
import { Button } from '@/components/ui/button'

const Hero = () => {
  const t = useTranslations('home-page.hero')
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = [girls.src, girls.src]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <div className="container max-md:px-0">
      <section className="relative h-screen w-full overflow-hidden md:h-[calc(100vh-115px)] md:rounded-3xl">
        {/* Image Carousel */}
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={'image'}
                className="h-full w-full object-cover"
              />
              {/* Overlay for better text readability */}
              <div
                style={{
                  background:
                    'linear-gradient(179.17deg, rgba(0, 0, 0, 0) 5.48%, #000000 118.1%)',
                }}
                className="absolute inset-0"
              />
            </div>
          ))}
          <div className="relative z-[1] flex h-screen w-full flex-col items-center justify-center gap-3 px-4 md:h-[calc(100vh-115px)] md:gap-8">
            <h1 className="max-w-3xl text-center text-3xl leading-relaxed font-bold text-white md:text-5xl md:font-[900]">
              {t('title')}
            </h1>
            <p className="text-center text-sm font-medium text-white md:text-xl">
              {t('description')}
            </p>
            <Button className="text-primary mt-4 w-full max-w-60 bg-white hover:bg-white/90">
              {t('button')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
