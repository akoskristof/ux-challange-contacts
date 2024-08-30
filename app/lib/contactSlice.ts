import { type Contact } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface ModalOptionsType {
  visible: boolean
  edit: boolean
  editId: string | null
}
export interface ContactState {
  contacts: Contact[]
  modalOptions: ModalOptionsType
}

const initialState: ContactState = {
  contacts: [],
  modalOptions: {
    edit: false,
    editId: null,
    visible: false
  }
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = [...state.contacts, action.payload]
    },
    storeUpdatedContact: (state, action: PayloadAction<Contact>) => {
      state.contacts[
        state.contacts.findIndex((contact) => contact.id === action.payload.id)
      ] = action.payload
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(e => {
        return e.id !== action.payload
      })
    },
    setModalOptions: (state, action: PayloadAction<ModalOptionsType>) => {
      state.modalOptions = action.payload
    }
  }
})

export const { setContacts, addContact, removeContact, setModalOptions, storeUpdatedContact } = contactSlice.actions
export const contactReducer = contactSlice.reducer
