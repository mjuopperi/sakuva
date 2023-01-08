import { MutableRefObject, useEffect, useState } from 'react'

export const useContainerWidth = (ref: MutableRefObject<any>) => {
  const [width, setDimensions] = useState(0)

  useEffect(() => {
    const handleResize = () => setDimensions(ref.current.offsetWidth)

    if (ref.current) setDimensions(ref.current.offsetWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  return width
}
