'use client'

import Image from 'next/image'
import { type MouseEvent, useEffect, useState } from 'react'
import Button from './Button'
import Add from '../../public/icons/Add.svg'
import Change from '../../public/icons/Change.svg'
import Remove from '../../public/icons/Delete.svg'

const ImageSelect = ({ setImage, image }: { setImage: any, image: string | null }) => {
  const [selectedImage, setSelectedImage] = useState<any>(image)

  const imageInput = document.getElementById('image')
  const reader = new FileReader()

  reader.onload = (e) => {
    setSelectedImage(e.target?.result ?? null)
  }
  useEffect(() => {
    if (imageInput) {
      imageInput.addEventListener('change', (e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if ((e.target as HTMLInputElement).files?.[0]) { reader.readAsDataURL(e.target.files[0]) }
      })
    }
  }, [imageInput])
  useEffect(() => {
    if (setImage) setImage(selectedImage)
  }, [selectedImage])
  const chooseImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    imageInput?.click()
  }

  return (
    <div className="p-4 flex flex-row items-center gap-4">
      <Image
        src={selectedImage || '/profiles/Default.png'}
        width={100}
        height={100}
        className="rounded-full"
        alt="selected image"
      />
      <input type="file" id="image" accept="image/*" hidden />
      {selectedImage
        ? (
        <>
          <Button mode="primary" className="p-4" onClick={chooseImage}>
            <Change /> Change picture
          </Button>
          <Button mode="primary" onClick={() => { setSelectedImage(null) }}>
            <Remove />
          </Button>
        </>
          )
        : (
        <Button mode="primary" className="p-4" onClick={chooseImage}>
          <Add /> Add picture
        </Button>
          )}
    </div>
  )
}

export default ImageSelect
