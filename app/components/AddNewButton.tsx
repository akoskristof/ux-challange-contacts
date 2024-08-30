'use client'

import Add from '../../public/icons/Add.svg'
import { setModalOptions } from '../lib/contactSlice'
import { useAppDispatch } from '../lib/store'
import Button from './Button'

export interface AddNewButtonProps {
  onClick?: () => void
}

export const AddNewButton: React.FC<AddNewButtonProps> = () => {
  const dispatch = useAppDispatch()
  return (
        <div className="p-2">
            <Button className="special" onClick={
                () => dispatch(setModalOptions({ visible: true, edit: false, editId: null }))
                }><Add/> Add New</Button>
        </div>
  )
}
