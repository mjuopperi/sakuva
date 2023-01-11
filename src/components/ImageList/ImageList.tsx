import React, { useEffect, useRef, useState } from 'react'

import { Image } from '../../api/imageApi'
import ImageComponent from '../common/Image'
import { useContainerWidth } from '../../util/hooks'

import contentVars from '../../app/content.module.scss'
import imageListVariables from './ImageList.module.scss'
import './ImageList.scss'


const CONTENT_WIDTH_LARGE = parseInt(contentVars.contentWithLarge) + 2 * parseInt(contentVars.contentHorizontalMargin)
const CONTENT_WIDTH_MEDIUM = parseInt(contentVars.contentWithMedium) + 2 * parseInt(contentVars.contentHorizontalMargin)

const IMAGE_WIDTH_LARGE = (parseInt(contentVars.contentWithLarge) - 2 * parseInt(imageListVariables.gridGap)) / 3
const IMAGE_WIDTH_MEDIUM = (parseInt(contentVars.contentWithMedium) - parseInt(imageListVariables.gridGap)) / 2

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

function columnCountFromWidth(width: number) {
  if (width >= 1200) return 3
  else if (width >= 796) return 2
  return 1
}

export default function ImageList({ images }: ImageListProps) {
  const ref = useRef(null)
  const width = useContainerWidth(ref)
  const [columnCount, setColumnCount] = useState(columnCountFromWidth(width))
  useEffect(() => setColumnCount(columnCountFromWidth(width)), [width])

  const columns = getImageColumns(images, columnCount)
  const sizes = [
    `(min-width: ${CONTENT_WIDTH_LARGE}px) ${IMAGE_WIDTH_LARGE}px`,
    `(min-width: ${CONTENT_WIDTH_MEDIUM}px) ${IMAGE_WIDTH_MEDIUM}px`,
    '100vw'
  ].join(',')

  return (
    <div className="image-list" ref={ref}>
      {columns.map((column, i) => (
        <div key={`column-${i}`} className="image-list__column">
          {column.map(image => (
            <div key={image.id} className="image-container">
              <ImageComponent image={image} sizes={sizes} />
              <div className={`image-overlay image-overlay--${image.width > image.height ? 'horizontal' : 'vertical'}`}>
                <span className="image-overlay__caption">{image.caption}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
