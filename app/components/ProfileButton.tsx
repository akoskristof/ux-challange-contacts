import Image from 'next/image'

export const ProfileButton = () => {
  return (
    <div className="p-2">
      <Image
        src="/profiles/Default.png"
        className="rounded-full border border-white border-solid"
        alt="profile image"
        width={24}
        height={24}
      />
    </div>
  )
}
