import React from 'react'
import clsx from 'clsx'

const baseStyles = 'inline-flex items-center rounded-full font-medium select-none'

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1'
}

const variantStyles = {
  primary: 'bg-secondary text-white',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
  neutral: 'bg-gray-100 text-gray-700'
}

export default function Badge({
  children,
  size = 'sm',
  variant = 'neutral',
  className
}) {
  return (
    <span
      role="status"
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
