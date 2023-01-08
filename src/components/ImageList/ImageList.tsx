import React from 'react'

import { Image } from '../../api/imageApi'
import ImageComponent from './Image'

import contentVariables from '../../app/content.module.scss'
import imageListVariables from './ImageList.module.scss'
import './ImageList.scss'


const MAX_COLUMNS = 3

function calculateMaxContentWidth(): number {
  return parseInt(contentVariables.contentMaxWidth) + 2 * parseInt(contentVariables.contentHorizontalMargin)
}

function calculateMaxImageWidth(): number {
  return (parseInt(contentVariables.contentMaxWidth) - (MAX_COLUMNS - 1) * parseInt(imageListVariables.gridGap)) / MAX_COLUMNS
}

const MAX_CONTENT_WIDTH = calculateMaxContentWidth()
const MAX_IMAGE_WIDTH = calculateMaxImageWidth()


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
  const columnCount = MAX_COLUMNS
  const columns = getImageColumns(images, columnCount)
  const sizes = `(min-width: ${MAX_CONTENT_WIDTH}px) ${MAX_IMAGE_WIDTH}px, 100vw"`

  return (
    <div className="image-list">
      {columns.map((column, i) => (
        <div key={`column-${i}`} className="image-list__column">
          {column.map(image => <ImageComponent key={image.id} image={image} sizes={sizes} />)}
        </div>
      ))}
    </div>
  )
}
