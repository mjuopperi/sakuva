import React from 'react'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'


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

  if (!image) return null

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      className={`image-modal image-modal--${image && image.width > image.height ? 'horizontal' : 'vertical'}`}
      overlayClassName="image-modal-overlay"
      appElement={document.getElementById('main') as HTMLElement}
    >
      <div className="image-modal__content">
        <button className="image-modal__close-button" onClick={onClose}><FiX /></button>
        <ImageComponent image={image} sizes={sizes} />
      </div>
    </Modal>
  )
}
