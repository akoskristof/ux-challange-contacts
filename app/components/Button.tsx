import { forwardRef, type MouseEventHandler, type ReactNode } from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: 'primary' | 'secondary'
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const ForwardedButton: React.ForwardRefRenderFunction<
HTMLButtonElement,
ButtonProps
> = ({ mode, children, onClick, className }, ref) => {
  return (
    <button
      onClick={onClick}
      className={mode + ' ' + className + ' p-2'}
      ref={ref}
    >
      {children}
    </button>
  )
}
const Button = forwardRef(ForwardedButton)

export default Button
