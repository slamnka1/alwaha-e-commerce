'use client'

import Autoplay from 'embla-carousel-autoplay'
import { UseEmblaCarouselType } from 'embla-carousel-react'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { useRouter } from '@/lib/i18n/navigation'

import { PreviewCard } from './preview-card'

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

const PreviewCarousel = ({
  products,
}: {
  products: { heading: string; subheading: string; data: Product[] }
}) => {
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

  const router = useRouter()

  const onClick = (index: number) => {
    if (currentSlideIndex === index) {
      router.push(`/search/${products.data[currentSlideIndex].id}`)
    }
    scrollToSlide(index)
  }

  return (
    <section className="pt-6">
      {/* Content Section */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-lg leading-tight font-bold lg:text-3xl 2xl:text-4xl">
          {/* {t('title')} */}
          {products.heading}
        </h2>
        <p className="mx-auto max-w-3xl text-xs leading-relaxed font-medium text-[#1A1A1A] lg:text-lg">
          {/* {t('description')} */}
          {products.subheading}
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
            {products.data.map((value, index) => (
              <CarouselItem
                key={value.id}
                className="basis-1/5 pl-0 md:basis-1/7"
              >
                <div className="relative">
                  <PreviewCard {...value} onClick={() => onClick(index)} />
                  {/* Shopping cart icon for active slide */}
                  {/* {index === currentSlideIndex && (
                    <div
                      onClick={() => router.push(`/search/${value.id}`)}
                      className="absolute right-1/2 bottom-0 z-20 translate-x-1/2 translate-y-1/2 cursor-pointer"
                    >
                      <div className="bg-primary rounded-full border border-white p-1 shadow-md md:p-1.5 lg:border-[3px] lg:p-2 lg:shadow-lg 2xl:p-2.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="31"
                          viewBox="0 0 32 31"
                          fill="none"
                          className="size-2.5 md:size-3 lg:size-4.5 2xl:size-6"
                        >
                          <path
                            d="M30.2175 5.26613C29.8542 4.83011 29.3993 4.47944 28.8852 4.23901C28.3711 3.99859 27.8103 3.87431 27.2428 3.875H6.35913L6.30488 3.42162C6.19386 2.47925 5.74092 1.61036 5.03193 0.9797C4.32294 0.349038 3.40719 0.000441483 2.4583 0L2.17155 0C1.82898 0 1.50044 0.136086 1.2582 0.37832C1.01597 0.620555 0.879883 0.949095 0.879883 1.29167C0.879883 1.63424 1.01597 1.96278 1.2582 2.20501C1.50044 2.44725 1.82898 2.58333 2.17155 2.58333H2.4583C2.77467 2.58337 3.08003 2.69953 3.31645 2.90976C3.55287 3.11999 3.70391 3.40968 3.74092 3.72387L5.51826 18.8364C5.70278 20.4081 6.45792 21.8573 7.64035 22.909C8.82278 23.9607 10.3502 24.5417 11.9327 24.5417H25.4215C25.7641 24.5417 26.0927 24.4056 26.3349 24.1633C26.5771 23.9211 26.7132 23.5926 26.7132 23.25C26.7132 22.9074 26.5771 22.5789 26.3349 22.3367C26.0927 22.0944 25.7641 21.9583 25.4215 21.9583H11.9327C11.1332 21.9561 10.354 21.7066 9.70188 21.2441C9.04977 20.7816 8.55666 20.1287 8.29017 19.375H23.6868C25.201 19.3751 26.6672 18.8431 27.829 17.8721C28.9908 16.901 29.7745 15.5526 30.0431 14.0624L31.0571 8.43846C31.1583 7.88047 31.1356 7.30704 30.9905 6.75882C30.8454 6.2106 30.5815 5.701 30.2175 5.26613ZM28.5215 7.97992L27.5063 13.6038C27.345 14.499 26.874 15.3088 26.1757 15.8916C25.4774 16.4744 24.5964 16.793 23.6868 16.7917H7.87942L6.66397 6.45833H27.2428C27.4325 6.4572 27.6202 6.49788 27.7924 6.5775C27.9647 6.65711 28.1173 6.77369 28.2394 6.91895C28.3614 7.06421 28.45 7.23459 28.4988 7.41796C28.5476 7.60133 28.5553 7.7932 28.5215 7.97992Z"
                            fill="#FFFCF9"
                          />
                          <path
                            d="M9.92122 30.9987C11.348 30.9987 12.5046 29.8421 12.5046 28.4154C12.5046 26.9886 11.348 25.832 9.92122 25.832C8.49449 25.832 7.33789 26.9886 7.33789 28.4154C7.33789 29.8421 8.49449 30.9987 9.92122 30.9987Z"
                            fill="#FFFCF9"
                          />
                          <path
                            d="M22.8382 30.9987C24.265 30.9987 25.4215 29.8421 25.4215 28.4154C25.4215 26.9886 24.265 25.832 22.8382 25.832C21.4115 25.832 20.2549 26.9886 20.2549 28.4154C20.2549 29.8421 21.4115 30.9987 22.8382 30.9987Z"
                            fill="#FFFCF9"
                          />
                        </svg>
                      </div>
                    </div>
                  )} */}
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
