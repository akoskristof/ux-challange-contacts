import Image from 'next/image'
import Mute from '../../public/icons/Mute.svg'
import Call from '../../public/icons/Call.svg'
import More from '../../public/icons/More.svg'
import Button from './Button'
import { type Dispatch, type MouseEvent, type SetStateAction, useRef } from 'react'
import { type Contact } from '@prisma/client'

const ContactListItem = ({
  contact,
  setMenu,
  menu,
  setEditedId
}: {
  contact: Contact
  setMenu: Dispatch<SetStateAction<DOMRect | null>>
  menu: DOMRect | null
  setEditedId: Dispatch<SetStateAction<string | null>>
}) => {
  const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget.getBoundingClientRect())
    setEditedId(contact.id)
  }
  const ref = useRef<HTMLButtonElement | null>(null)
  const myMenuOpened = () => {
    return (ref.current && ref.current?.getBoundingClientRect()?.top === menu?.top)
  }

  return (
    <div
      className={
        'flex flex-row items-center w-full gap-4 p-3 ' +
        (myMenuOpened() ? 'hovered' : '')
      }
    >
      <div className=" flex flex-row gap-2 flex-1 max-sm:self-start">
        <Image
          src={contact?.image || '/profiles/Default.png'}
          alt=""
          className=" rounded-full"
          width={40}
          height={40}
        />
        <div className="flex-1 flex flex-col">
          <h3>{contact.name}</h3>
          <label>{contact.tel}</label>
        </div>
      </div>
      <div className={'display-on-hover flex flex-row gap-2 self-end'}>
        <Button mode="secondary" className="p-2 max-sm:hidden">
          <Mute />
        </Button>
        <Button mode="secondary" className="p-2 max-sm:hidden">
          <Call />
        </Button>
        <Button mode="secondary" className={'p-2 ' + (myMenuOpened() ? 'active' : '')} onClick={openMenu} ref={ref}>
          <More />
        </Button>
      </div>
    </div>
  )
}

export default ContactListItem
