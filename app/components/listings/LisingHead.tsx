'use client'

import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
 
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

interface Props {
  title: string,
  imageSrc: string,
  locationValue: string,
  id: string,
  currentUser: SafeUser | null,
}

const LisingHead:React.FC<Props> = ({title,imageSrc,locationValue,id,currentUser}) => {
  
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`}/>
      <div className=' w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image src={imageSrc} alt='Image' fill className=' object-cover w-full' />
        <div className=' absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser}/>
        </div>
      </div>
    </>
  )
}

export default LisingHead