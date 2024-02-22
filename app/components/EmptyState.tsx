'use client'

import { useRouter } from 'next/navigation'
 
import Heading from './Heading'
import Button from './Button'

interface Props {
  title? : string
  subtitle?: string
  showReset?: boolean
}

const EmptyState: React.FC<Props> = ({title = '查無任何房型', subtitle = '請更改你的篩選條件', showReset}) => {
  const router = useRouter();
  
  return (
    <div className=' h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading title={title} subtitle={subtitle} center/>
      <div className=' w-48 mt-4'>
        {showReset && (
          <Button outline label='清除任何條件' onClick={() => router.push('/')}/>
        )}
      </div>
    </div>
  )
}

export default EmptyState