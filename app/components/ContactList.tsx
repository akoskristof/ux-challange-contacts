'use client'

import { type Contact } from '@prisma/client'
import { useEffect, useState } from 'react'
import { setContacts } from '../lib/contactSlice'
import { useAppDispatch, useAppSelector } from '../lib/store'
import ContactListItem from './ContactListItem'
import Menu from './Menu'

interface ContactListProps {
  getContacts: () => Promise<Contact[]>
  deleteContact: (id: string) => Promise<string>
}

const ContactList = ({ getContacts, deleteContact }: ContactListProps) => {
  const [anchor, setAnchor] = useState<DOMRect | null>(null)
  const [editedId, setEditedId] = useState<string | null>(null)

  const { contacts } = useAppSelector((state) => state.contacts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    getContacts().then(res => {
      dispatch(setContacts(res))
    }).catch(err => {
      console.log(err)
    }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className="w-full">
      {contacts?.map((profile, index) => (
        <ContactListItem
          contact={profile}
          setMenu={setAnchor}
          setEditedId={setEditedId}
          menu={anchor}
          key={'contact-' + index}
        />
      ))}
      <Menu
          id={editedId} anchor={anchor} setAnchor={setAnchor} deleteContact={deleteContact} />
    </div>
  )
}

export default ContactList
