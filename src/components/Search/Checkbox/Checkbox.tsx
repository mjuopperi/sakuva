

import './Checkbox.scss'
import { ChangeEvent, ReactNode, useState } from 'react'

interface CheckboxProps {
  initialValue: boolean
  onChange: (value: boolean) => void
  children: ReactNode
}

export default function Checkbox({ initialValue, onChange, children }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(initialValue)
  function handleChange() {
    const newValue = !isChecked
    setIsChecked(newValue)
    onChange(newValue)
  }

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      {children}
    </label>
  )
}
