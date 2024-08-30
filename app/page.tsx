import { type Contact, PrismaClient } from '@prisma/client'
import { AddNewButton } from './components/AddNewButton'
import { BackButton } from './components/BackButton'
import ContactList from './components/ContactList'
import Modal from './components/Modal'
import { ProfileButton } from './components/ProfileButton'
import { SettingsButton } from './components/SettingsButton'
import ThemeSwitcher from './components/ThemeSwitcher'

const prisma = new PrismaClient()

export default async function Home () {
  async function getContacts () {
    'use server'

    return await prisma.contact.findMany()
  }
  async function createContact (contact: Contact) {
    'use server'

    console.log(contact)
    const data = {
      name: contact.name,
      tel: contact.tel,
      email: contact.email,
      image: contact.image
    }

    return await prisma.contact
      .create({ data })
      .then((res) => {
        console.log('created', res.id)
        return res
      })
      .catch((err) => {
        console.log(err)
        return null
      })
  }
  async function editContact (contact: Contact) {
    'use server'

    const data = {
      name: contact.name,
      tel: contact.tel,
      email: contact.email,
      image: contact.image
    }

    return await prisma.contact
      .update({
        where: {
          id: contact.id
        },
        data
      })
      .then((res) => {
        console.log('updated', contact.id)
        return res
      })
      .catch((err) => {
        console.log(err)
        return null
      })
  }
  async function deleteContact (id: string) {
    'use server'

    console.log('id', id)

    return await prisma.contact
      .delete({
        where: {
          id
        }
      })
      .then((res) => {
        console.log('deleted', res.id)
        return res.id
      })
      .catch((err) => {
        console.log(err)
        return ''
      })
  }

  return (
    <main className="parent">
      <div className="div1" />
      <div className="div2" />
      <div className="div3" />
      <div className="div4 justify-end flex items-center p-5">
        <div className="max-sm:flex-1">
          <BackButton />
        </div>
        <div className="sm:hidden">
          <ThemeSwitcher />
        </div>
      </div>
      <div className="div5 flex flex-col w-full max-w-5xl items-center justify-center container mx-auto p-5">
        <div className="flex flex-row w-full max-sm:flex-col max-sm:items-center">
          <h1 className="flex-1 m-auto">Contacts</h1>
          <nav className="flex flex-row gap-2 items-center">
            <SettingsButton />
            <ProfileButton />
            <AddNewButton />
          </nav>
        </div>
      </div>
      <div className="div6 items-center flex p-5 max-sm:hidden">
        <ThemeSwitcher />
      </div>
      <div className="div7" />
      <div className="div8 p-2">
        <ContactList
          getContacts={getContacts}
          deleteContact={deleteContact}
        />
      </div>
      <div className="div9" />
      <Modal createContact={createContact} editContact={editContact} />
    </main>
  )
}
