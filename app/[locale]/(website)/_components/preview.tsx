'use client'

import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { UseEmblaCarouselType } from 'embla-carousel-react'
import { ShoppingCart } from 'lucide-react'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { PreviewCard, ProductCardType } from './preview-card'

const slides: ProductCardType[] = [
  {
    id: '1',
    image: '/girls.jpg', // Using existing image from assets
    title: 'Traditional Cream Dress',
    isPlusSize: true,
    discount: 15,
    price: 89.99,
  },
  {
    id: '2',
    image: '/girls.jpg',
    title: 'Blue Striped Shirt',
    isPlusSize: false,
    discount: 10,
    price: 45.99,
  },
  {
    id: '3',
    image: '/girls.jpg',
    title: 'Plaid Blazer Set',
    isPlusSize: true,
    discount: 20,
    price: 120.99,
  },
  {
    id: '4',
    image: '/girls.jpg',
    title: 'Graduation Gown',
    isPlusSize: true,
    discount: 25,
    price: 150.99,
  },
  {
    id: '5',
    image: '/girls.jpg',
    title: 'Elegant Abaya',
    isPlusSize: true,
    discount: 30,
    price: 200.99,
  },
  {
    id: '6',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },
  {
    id: '7',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },
  {
    id: '8',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },
  {
    id: '9',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },
  {
    id: '10',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },

  {
    id: '11',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },
  {
    id: '12',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },
  {
    id: '13',
    image: '/girls.jpg',
    title: 'Casual Summer Dress',
    isPlusSize: false,
    discount: 12,
    price: 65.99,
  },
]

const TWEEN_FACTOR_BASE = 0.15
const SCALE_MIN = 0.8
const SCALE_MAX = 2.5

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type CarouselApi = UseEmblaCarouselType[1]

/**
 * Custom hook for managing carousel scaling animations
 */
const useCarouselScaling = (emblaApi: CarouselApi | undefined) => {
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  // Initialize tween nodes (DOM elements to be scaled)
  const initializeTweenNodes = useCallback((api: CarouselApi): void => {
    if (!api) return
    tweenNodes.current = api.slideNodes()
  }, [])

  // Calculate tween factor based on number of slides
  const calculateTweenFactor = useCallback((api: CarouselApi) => {
    if (!api) return
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  // Calculate scale for a single slide
  const calculateSlideScale = useCallback(
    (
      diffToTarget: number,
      tweenFactorValue: number
    ): { scale: string; zIndex: string } => {
      // Scale up based on proximity to active slide (closer = higher scale)
      const tweenValue = 1 + (1 - Math.abs(diffToTarget * tweenFactorValue)) * 1
      const scale = numberWithinRange(tweenValue, SCALE_MIN, SCALE_MAX)

      // Calculate z-index based on proximity to center (closer = higher z-index)
      const zIndexValue = Math.max(
        1,
        10 - Math.abs(diffToTarget * tweenFactorValue) * 10
      )

      return { scale: scale.toString(), zIndex: zIndexValue.toFixed() }
    },
    []
  )

  // Handle loop adjustments for infinite carousel
  const adjustForLoop = useCallback(
    (
      engine: any,
      slideIndex: number,
      scrollSnap: number,
      scrollProgress: number
    ): number => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        // Get the total number of slides
        const totalSlides = engine.slideRegistry.length

        // Normalize the difference to handle loop transitions
        // When diffToTarget is greater than 0.5, we're transitioning from end to beginning
        // When diffToTarget is less than -0.5, we're transitioning from beginning to end
        if (diffToTarget > 0.5) {
          diffToTarget = diffToTarget - 1
        } else if (diffToTarget < -0.5) {
          diffToTarget = diffToTarget + 1
        }
      }

      return diffToTarget
    },
    []
  )

  // Apply scaling animation to all slides
  const applyScalingAnimation = useCallback(
    (api: CarouselApi, eventName?: string) => {
      if (!api) return

      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView = api.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          // Skip slides not in view during scroll events for performance
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          // Calculate the difference to target position
          const diffToTarget = adjustForLoop(
            engine,
            slideIndex,
            scrollSnap,
            scrollProgress
          )

          // Calculate and apply scale
          const scale = calculateSlideScale(diffToTarget, tweenFactor.current)
          const tweenNode = tweenNodes.current[slideIndex]

          if (tweenNode) {
            tweenNode.style.scale = scale.scale
            tweenNode.style.zIndex = scale.zIndex
          }
        })
      })
    },
    [adjustForLoop, calculateSlideScale]
  )

  // Setup event listeners
  useEffect(() => {
    if (!emblaApi) return

    // Initialize on mount
    initializeTweenNodes(emblaApi)
    calculateTweenFactor(emblaApi)
    applyScalingAnimation(emblaApi)

    // Setup event listeners
    emblaApi
      .on('reInit', initializeTweenNodes)
      .on('reInit', calculateTweenFactor)
      .on('reInit', applyScalingAnimation)
      .on('scroll', applyScalingAnimation)
      .on('slideFocus', applyScalingAnimation)
  }, [
    emblaApi,
    initializeTweenNodes,
    calculateTweenFactor,
    applyScalingAnimation,
  ])

  return {
    initializeTweenNodes,
    calculateTweenFactor,
    applyScalingAnimation,
  }
}

const PreviewCarousel = () => {
  const t = useTranslations('preview')
  const [emblaApi, setApi] = useState<CarouselApi>()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Use the custom hook for scaling animations
  useCarouselScaling(emblaApi)

  // Function to scroll to a specific slide
  const scrollToSlide = useCallback(
    (slideIndex: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(slideIndex)
      }
    },
    [emblaApi]
  )

  // Update current slide index when carousel changes
  useEffect(() => {
    if (!emblaApi) return

    const onSlideChange = () => {
      setCurrentSlideIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSlideChange)
    return () => {
      emblaApi.off('select', onSlideChange)
    }
  }, [emblaApi])

  return (
    <section className="pt-6">
      {/* Content Section */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-lg leading-tight font-bold lg:text-3xl 2xl:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto max-w-3xl text-xs leading-relaxed font-medium text-[#1A1A1A] lg:text-lg">
          {t('description')}
        </p>
      </div>
      <div className="relative container">
        {/* Left fade shadow */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-30 bg-gradient-to-r from-white to-transparent" />

        {/* Right fade shadow */}
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-30 bg-gradient-to-l from-white to-transparent" />

        <Carousel
          opts={{
            align: 'center',
            slidesToScroll: 1,
            containScroll: false,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="my-14 ml-0 pb-8 sm:my-24 md:pb-16 lg:my-36 xl:my-48">
            {slides.map((value, index) => (
              <CarouselItem
                key={value.id}
                className="basis-1/6 pl-0 md:basis-1/7"
              >
                <div className="relative">
                  <PreviewCard
                    {...value}
                    onClick={() => scrollToSlide(index)}
                  />
                  {/* Shopping cart icon for active slide */}
                  {index === currentSlideIndex && (
                    <div className="absolute right-1/2 bottom-0 z-20 translate-x-1/2 translate-y-1/2 cursor-pointer">
                      <div className="bg-primary rounded-full border border-white p-1 shadow-md md:p-1.5 lg:border-[3px] lg:p-2.5 lg:shadow-lg">
                        <ShoppingCart className="size-2.5 text-white md:size-3 lg:size-6" />
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export default PreviewCarousel
