'use client'

import   {useCallback, useState} from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'

const RegisterModal = () => {

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({ defaultValues: {
    name: '', email: '', password: '',
  } })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        console.log(error)
        toast.error('Something error')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal])
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='歡迎來到Airbnb' subtitle='創立一個帳號'/>
      <Input id='email' label='信箱' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='name' label='名稱' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='password' label='密碼' type='password' disabled={isLoading} register={register} errors={errors} required/>
    </div>
  )
  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label='使用Google進行註冊' Icon={FcGoogle} onClick={() => signIn('google')}/>
      <Button outline label='使用Github進行註冊' Icon={ AiFillGithub } onClick={() => signIn('github')}/>
      <div className=' text-neutral-500 text-center my-4 font-light'>
        <div className='flex flex-row items-center gap-2 justify-center'>
          <div>之前有辦過帳號了？</div>
          <div onClick={toggle} className=' text-neutral-800 cursor-pointer hover:underline'>登入</div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='註冊' actionLabel='註冊' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)}
    body={bodyContent} footer={footerContent}/>
  )
}

export default RegisterModal