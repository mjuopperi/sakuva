'use client'

import { useState } from 'react'
import Modal from 'react-modal'
import { useRouter } from 'next/navigation'
import ImageModal from '../../components/ImageModal'


interface ImagePageProps {
  params: {id: string}
}

export default function ImagePage({ params }: ImagePageProps) {
  const router = useRouter()
  return (
    <ImageModal imageId={parseInt(params.id)} onClose={() => router.push('/')} />
  )
}
