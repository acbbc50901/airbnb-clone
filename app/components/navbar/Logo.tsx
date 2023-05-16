'use client'

 
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();
  return (
    <Image alt='Logo' onClick={() => router.push('/')} className=' hidden md:block cursor-pointer' height='100' width='100' src='/img/logo.png'/>
  )
}

export default Logo