'use client'

 
import { SafeUser } from '../types'
import { useRouter } from 'next/navigation'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import useFavorite from '../hooks/useFavorite'


interface Props {
  currentUser: SafeUser | null,
  listingId: string
}

const HeartButton: React.FC<Props> = ({currentUser, listingId}) => {
  const router = useRouter();
  const { hasFavorited, toggleFavorite } = useFavorite({listingId, currentUser})

  return (
    <div onClick={toggleFavorite} className=' relative hover:opacity-80 transition cursor-pointer'>
      <AiOutlineHeart size={28} className=' fill-white absolute -top-[2px] -right-[2px]'/>
      <AiFillHeart  size={24} className={hasFavorited ? 'fill-red-500' : ' fill-neutral-500/70'}/>
    </div>
  )
}

export default HeartButton