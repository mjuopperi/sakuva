import React from 'react'
import ImageComponent from 'next/image'

import { imgUrl } from '../../../api/apiUtils'
import { Image as ImageModel } from '../../../api/imageApi'

import './Image.scss'

export default function Image({ image }: {image: ImageModel}) {
  return (
    <div
      key={image.id}
      className={[
        'image',
        `image--${image.width > image.height ? 'horizontal' : 'vertical'}`,
        `image--${image.isColor ? 'color' : 'grayscale'}`,
      ].join(' ')}
    >
      <ImageComponent
        src={imgUrl(image.urlPath)}
        alt={image.caption}
        fill
        sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
      />
    </div>
  )
}
