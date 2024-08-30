/* eslint-disable react/prop-types */
import { type MouseEventHandler, type ReactNode } from 'react'
import { type ButtonProps } from './Button'

export interface IconButtonProps extends ButtonProps {
  mode: 'primary' | 'secondary'
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<IconButtonProps> = ({ mode, children, onClick }) => {
  return (
    <button onClick={onClick} className={mode}>
      {children}
    </button>
  )
}

export default Button
