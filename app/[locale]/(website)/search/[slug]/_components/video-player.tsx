import ReactPlayer from 'react-player'

import React from 'react'

type Props = {
  src: string
}

const VideoPlayer = ({ src }: Props) => {
  return (
    <div className="h-full">
      <ReactPlayer
        width="100%"
        height="100%"
        style={{
          padding: '0 20px',
        }}
        controls
        src={src}
      />
    </div>
  )
}

export default VideoPlayer
