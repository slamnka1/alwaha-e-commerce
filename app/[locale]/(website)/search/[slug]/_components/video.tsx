'use client'

import { X } from 'lucide-react'
import { parseAsBoolean, useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'
import FullscreenModal from '@/components/ui/fullscreen-modal'

import VideoPlayer from './video-player'

const VideoSlider = ({ src }: { src: string }) => {
  const [opened, setOpened] = useQueryState(
    'video',
    parseAsBoolean.withDefault(false)
  )
  const close = () => {
    setOpened(false)
  }

  return (
    <FullscreenModal open={opened} onOpenChange={(v) => setOpened(Boolean(v))}>
      <div className="relative h-full w-full">
        <div className="absolute top-4 left-4 z-10">
          <Button size="icon" onClick={close} variant="secondary">
            <X strokeWidth={1.25} />
          </Button>
        </div>
        <div className="mx-a relative flex h-full items-center justify-center p-2 lg:p-5">
          <VideoPlayer src={src} />
        </div>
      </div>
    </FullscreenModal>
  )
}

export default VideoSlider
