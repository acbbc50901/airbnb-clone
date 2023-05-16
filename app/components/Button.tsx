'use client'
 
import { IconType } from 'react-icons/lib'

interface Props {
  label: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled? : boolean,
  outline?: boolean,
  smail?: boolean,
  Icon?: IconType,
}
const Button:React.FC<Props> = ({label, onClick, disabled, outline, smail, Icon}) => {
  return (
    <button className={` relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
      ${outline ? 'bg-white': 'bg-rose-500'}  ${outline ? ' border-black': ' border-rose-500'}  ${outline ? ' text-black': 'text-white'}
      ${smail ? 'py-1': 'py-3'}  ${smail ? 'text-sm': 'text-md'} ${smail ? ' font-light': ' font-semibold'} ${smail ? ' border-[1px]': 'border-2'}  

    `} onClick={onClick} disabled={disabled}> 
        {Icon && (
          <Icon className=' absolute left-4 top-3' size={24}/>
        )}
        {label} </button>
  )
}

export default Button