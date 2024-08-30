'use client'

import { type Contact } from '@prisma/client'
import { type MouseEvent, useEffect, useState } from 'react'
import { addContact, setModalOptions, storeUpdatedContact } from '../lib/contactSlice'
import { useAppDispatch, useAppSelector } from '../lib/store'
import Button from './Button'
import ImageSelect from './ImageSelect'

const Modal = ({ createContact, editContact }: {
  createContact: (contact: Contact) => Promise<Contact | null>
  editContact: (contact: Contact) => Promise<Contact | null>
}) => {
  const { contacts, modalOptions } = useAppSelector((state) => state.contacts)
  const dispatch = useAppDispatch()
  const editedContact = contacts.find((e) => e.id === modalOptions?.editId)

  const [data, setData] = useState<Contact>({
    id: '',
    image: '',
    email: '',
    tel: '',
    name: ''
  })
  useEffect(() => {
    if (modalOptions?.edit && !!editedContact && !!modalOptions?.edit) {
      setData(editedContact)
      console.log('edited changed', editedContact)
    } else {
      setData({
        id: '',
        image: '',
        email: '',
        tel: '',
        name: ''
      })
    }
    console.log(modalOptions?.edit)
  }, [editedContact, modalOptions, setData])

  console.log(data)

  const close = (e: MouseEvent<any>) => {
    dispatch(setModalOptions({ edit: false, editId: null, visible: false }))
  }
  const backendCall = (e: MouseEvent<any>) => {
    e.preventDefault()
    if (modalOptions.edit) {
      editContact(data).then((res) => {
        if (res) {
          dispatch(storeUpdatedContact(res))
          dispatch(setModalOptions({ ...modalOptions, visible: false }))
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      createContact(data).then((res) => {
        if (res) {
          dispatch(addContact(res))
          dispatch(setModalOptions({ ...modalOptions, visible: false }))
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  if (modalOptions?.visible) {
    return (
      <div className="modal-container" onClick={close}>
        <div className="modal" onClick={(e) => { e.stopPropagation() }}>
          <form id="addForm">
            <div className="p-6">
              <h1>{modalOptions.edit ? 'Edit' : 'Add'} contact</h1>
              <ImageSelect
                image={data.image}
                setImage={(e: string) => { setData({ ...data, image: e }) }}
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Jamie Wright"
                value={data.name}
                onChange={(e) => { setData({ ...data, name: e.target.value }) }}
              />
              <label htmlFor="name">Phone number</label>
              <input
                type="text"
                placeholder="+01 234 5678"
                value={data.tel}
                onChange={(e) => { setData({ ...data, tel: e.target.value }) }}
              />
              <label htmlFor="name">Email address</label>
              <input
                type="text"
                placeholder="jamie.wright@mail.com"
                value={data.email}
                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
              />
            </div>
            <div className="w-full justify-end flex flex-row p-6 gap-2">
              <Button mode="secondary" onClick={close}>
                Cancel
              </Button>
              <Button mode="primary" onClick={backendCall}>
                Done
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Modal
