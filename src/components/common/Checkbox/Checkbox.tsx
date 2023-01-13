

import './Checkbox.scss'
import { ChangeEvent, ReactNode, useState } from 'react'

interface CheckboxProps {
  name: string
  initialValue: boolean | undefined
  onChange: (value: boolean) => void
  children: ReactNode
}

export default function Checkbox({ name, initialValue, onChange, children }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(initialValue)
  function handleChange() {
    const newValue = !isChecked
    setIsChecked(newValue)
    onChange(newValue)
  }

  return (
    <>
      <input id={name} name={name} className="checkbox__input" type="checkbox" checked={isChecked} onChange={handleChange} />
      <label htmlFor={name} className="checkbox__label">
        {children}
      </label>
    </>
  )
}
