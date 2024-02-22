'use client'

import   {useCallback, useState} from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'
import { useRouter } from 'next/navigation'


const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal  = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({ defaultValues: {
      email: '', password: '',
    }})
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false);
      if(callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='歡迎回來' subtitle='登入您的帳號'/>
      <Input id='email' label='信箱' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='password' label='密碼' type='password' disabled={isLoading} register={register} errors={errors} required/>
    </div>
  )
  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label='使用Google登入' Icon={FcGoogle} onClick={() => signIn('google')}/>
      <Button outline label='使用Github登入' Icon={ AiFillGithub } onClick={() => signIn('github')}/>
      <div className=' text-neutral-500 text-center my-4 font-light'>
        <div className='flex flex-row items-center gap-2 justify-center'>
          <div>第一次使用Airbnb?</div>
          <div onClick={toggle} className=' text-neutral-800 cursor-pointer hover:underline'>創立一個屬於你的帳號</div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='登入' actionLabel='登入' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)}
    body={bodyContent} footer={footerContent}/>
  )
}

export default LoginModal