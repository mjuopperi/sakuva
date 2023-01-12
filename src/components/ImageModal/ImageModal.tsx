import React from 'react'
import Modal from 'react-modal'

import { useGetImage } from '../../api/imageHooks'
import ImageComponent from '../common/Image/Image'

import './ImageModal.scss'

interface ImageModalProps {
  imageId: number
  onClose: () => void
}

export default function ImageModal({ imageId, onClose }: ImageModalProps) {
  const { data: image } = useGetImage(imageId)
  const sizes = [
    '100vw'
  ].join(',')

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      className={`image-modal image-modal--${image && image.width > image.height ? 'horizontal' : 'vertical'}`}
      overlayClassName="image-modal-overlay"
      appElement={document.getElementById('main') as HTMLElement}
    >
      {image ? <ImageComponent image={image} sizes={sizes} /> : null}
    </Modal>
  )
}
