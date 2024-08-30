'use client'
import React from 'react'
import LightMode from '../../public/icons/LightMode.svg'
import Button from './Button'

const ThemeSwitcher = () => {
  return (
    <Button mode="secondary">
      <LightMode />
    </Button>
  )
}

export default ThemeSwitcher
