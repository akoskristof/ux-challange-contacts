import {
  type Dispatch,
  useEffect
} from 'react'
import Delete from '../../public/icons/Delete.svg'
import Favourite from '../../public/icons/Favourite.svg'
import Settings from '../../public/icons/Settings.svg'
import { removeContact, setModalOptions } from '../lib/contactSlice'
import { useAppDispatch, useAppSelector } from '../lib/store'
import Button from './Button'

interface ModalProps {
  id: string | null
  anchor: DOMRect | null
  setAnchor: Dispatch<DOMRect | null>
  deleteContact: (id: string) => Promise<string>
}

const Menu = ({ id, anchor, setAnchor, deleteContact }: ModalProps) => {
  const { modalOptions } = useAppSelector((state) => state.contacts)
  const dispatch = useAppDispatch()
  const close = () => {
    setAnchor(null)
  }
  const edit = () => {
    dispatch(setModalOptions({
      visible: true,
      edit: true,
      editId: id
    }))
    close()
  }
  const backendCall = () => {
    if (id) {
      deleteContact(id).then((res) => {
        dispatch(removeContact(id))
        close()
      }).catch(err => {
        console.log(err)
      })
    }
    console.log(id)
  }

  useEffect(() => {
    dispatch(setModalOptions({
      ...modalOptions,
      edit: true,
      editId: id
    }))
  }, [anchor])

  if (anchor) {
    return (
      <div className="menu-container absolute" onClick={close}>
        <div
          className="menu absolute"
          onClick={(e) => { e.stopPropagation() }}
          style={{ left: anchor.left + 0, top: anchor.top + 45 }}
        >
          <Button
            mode="primary"
            className="w-full p-2 justify-start"
            onClick={edit}
          >
            <Settings /> Edit
          </Button>
          <Button mode="primary" className="w-full p-2 justify-start">
            <Favourite /> Favourite
          </Button>
          <Button mode="primary" className="w-full p-2 justify-start" onClick={backendCall}>
            <Delete /> Remove
          </Button>
        </div>
      </div>
    )
  }
}

export default Menu
