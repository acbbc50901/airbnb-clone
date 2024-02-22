'use client'

import   { useState, useMemo } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../Inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../Inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../Inputs/Counter'
import ImageUpload from '../Inputs/ImageUpload'
import Input from '../Inputs/Input'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES= 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setSetp] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  })

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'),{
    ssr: false
  }),[])

  const setCustomValue = (id: string, value: any ) => {
    setValue(id,value,{
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setSetp((value) => value - 1);
  }
  const onNext = () => {
    setSetp((value) => value + 1);
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
      .then((data) => {
        toast.success('Listing Created!')
        router.refresh();
        reset();
        setSetp(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong');
      }).finally(() => {
        setIsLoading(false);
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return '創立'
    }

    return '下一步'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return '上一步'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='哪個種類最適合你的房間特色?' subtitle='選擇你的類型'/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {
          categories.map((item) => (
            <div key={item.label} className='col-span-1'>
              <CategoryInput
                onClick={(category) => setCustomValue('category', category)}
                selected={category === item.label}
                label ={item.label}
                icon = {item.icon}
              />
            </div>
          ))
        }
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='你的房間座落於哪個國家呢?' subtitle='幫助大家搜尋到你的房間!'/>
        <CountrySelect  onChange={(value) => setCustomValue('location', value)} value={location}/>
        <Map center={location?.latlng}/>
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='房間的詳細內容' subtitle='你有什麼'></Heading>
        <Counter title='人數' subtitle='你可以入住多少人?' vlaue={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
        <hr />
        <Counter title='房間' subtitle='你有多少房間?' vlaue={roomCount} onChange={(value) => setCustomValue('roomCount', value)}/>
        <hr />
        <Counter title='廁所' subtitle='你有多少廁所?' vlaue={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)}/>
      </div>
    )
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='為你的房間加入封面照' subtitle='讓大家看看你的房間'></Heading>
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
      </div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='房間的標題' subtitle='介紹你完美的房間!'></Heading>
        <Input id='title' label='標題' disabled={isLoading} register={register} errors={errors} required/>
        <hr />
        <Input id='description' label='內容介紹' disabled={isLoading} register={register} errors={errors} required/>
      </div>
    )
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='你的房間一天要多少?' subtitle='自訂金額!'></Heading>
        <Input id='price' label='價格' formatPrice type='number' disabled={isLoading} register={register} errors={errors} required/>
      </div>
    )
  }
  return (
    <Modal title='上架你的Airbnb房間' isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent}
      secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} actionLabel={actionLabel}/>
  )
}

export default RentModal