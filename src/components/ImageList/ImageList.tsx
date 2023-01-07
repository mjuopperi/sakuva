import React from 'react'
import ImageComponent from 'next/image'

import { Image } from '../../api/imageApi'
import { imgUrl } from '../../api/apiUtils'

import './ImageList.scss'

interface ImageListProps {
  images: Array<Image>
}

function getImageColumns(images: Array<Image>, columnCount: number): Array<Array<Image>> {
  // Note: Array(columnCount).fill([]) does not work. See: https://stackoverflow.com/a/73458295/548841
  const columns: Array<Array<Image>> = Array.from(Array(columnCount), () => [])
  const columnHeights = Array(columnCount).fill(0)
  for (const image of images) {
    const indexOfMin = columnHeights.indexOf(Math.min(...columnHeights))
    const imageHeight = image.height > image.width ? 1.5 : 0.667
    columns[indexOfMin].push(image)
    columnHeights[indexOfMin] += imageHeight
  }
  return columns
}

export default function ImageList({ images }: ImageListProps) {
  const columnCount = 3
  const columns = getImageColumns(images, columnCount)

  return (
    <div className="image-list">
      {columns.map((column, i) => (
        <div key={`column-${i}`} className="image-list__column">
          {column.map(image => (
            <div
              key={image.id}
              className={[
                'image-list__image-container',
                `image-list__image-container--${image.width > image.height ? 'horizontal' : 'vertical'}`,
                `image-list__image-container--${image.isColor ? 'color' : 'grayscale'}`,
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
          ))}
        </div>
      ))}
    </div>
  )
}
