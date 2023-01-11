import { ReactNode } from 'react'

import './Button.scss'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}

export default function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      className="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
