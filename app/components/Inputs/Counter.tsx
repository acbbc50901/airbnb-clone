'use client'

import {useCallback} from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface Props {
  title: string,
  subtitle: string,
  vlaue: number,
  onChange: (value: number) => void,
}

const Counter: React.FC<Props> = ({title, subtitle, vlaue, onChange}) => {
  const onAdd = useCallback(()=> {
    onChange(vlaue + 1);
  },[onChange, vlaue])

  const onReduce = useCallback(() => {
    if (vlaue=== 1) {
      return;
    }
    onChange(vlaue - 1);
  }, [onChange, vlaue])
  return (
    <div className='flex flex-row items-center justify-between'>
      <div className=' flex flex-col'>
        <div className=' font-medium'> {title} </div>
        <div className=' font-light text-gray-500'> {subtitle} </div>
      </div>
      <div className=' flex flex-row items-center gap-4'>
        <div onClick={onReduce} className=' w-10 h-10 rounded-full border-[1px] border-neutral-400 flex
          items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'>
            <AiOutlineMinus/>
        </div>
        <div className=' font-light text-xl text-neutral-600'> {vlaue} </div>
        <div onClick={onAdd} className=' w-10 h-10 rounded-full border-[1px] border-neutral-400 flex
          items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'>
            <AiOutlinePlus/>
        </div>
      </div>
    </div>
  )
}

export default Counter