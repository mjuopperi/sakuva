/* eslint-disable @next/next/no-img-element */
import React from 'react'

import { imgUrl } from '../../../api/apiUtils'
import { Image as ImageModel } from '../../../api/imageApi'

import './Image.scss'


const THUMBNAIL_SIZES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200]

function srcset(image: ImageModel): string {
  const [basePath, extension] = image.urlPath.split('.')
  const baseUrl = imgUrl(basePath)
  const sources = THUMBNAIL_SIZES.map(size => `${baseUrl}_${size}.${extension} ${size}w`)
  return sources.join(',')
}


export default function Image({ image }: {image: ImageModel}) {
  return (
    <div
      key={image.id}
      className={[
        'image',
        'image--fill',
        `image--${image.width > image.height ? 'horizontal' : 'vertical'}`,
        `image--${image.isColor ? 'color' : 'grayscale'}`,
      ].join(' ')}
    >
      <img
        src={imgUrl(image.urlPath)}
        srcSet={srcset(image)}
        sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
        alt={image.caption}
      />
    </div>
  )
}
