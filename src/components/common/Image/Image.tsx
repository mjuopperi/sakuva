/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

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

function placeholderSrc(image: ImageModel): string {
  const [basePath, extension] = image.urlPath.split('.')
  return `${basePath}_${THUMBNAIL_SIZES[0]}.${extension}`
}


interface ImageProps {
  image: ImageModel;
  sizes: string
  fill?: boolean
}

export default function Image({ image, sizes, fill = false }: ImageProps) {
  return (
    <div
      key={image.id}
      className={[
        'image',
        ...(fill ? ['image--fill'] : []),
        'image--blur',
        `image--${image.width > image.height ? 'horizontal' : 'vertical'}`,
        `image--${image.isColor ? 'color' : 'grayscale'}`,
      ].join(' ')}
    >
      <LazyLoadImage
        src={imgUrl(image.urlPath)}
        srcSet={srcset(image)}
        sizes={sizes}
        alt={image.caption}
        threshold={400}
        effect="blur"
        placeholderSrc={placeholderSrc(image)}
      />
    </div>
  )
}
