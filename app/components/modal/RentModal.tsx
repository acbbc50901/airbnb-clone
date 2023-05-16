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
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Which of these best describes ypur place?' subtitle='Pick a category'/>
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
        <Heading title='Where is your place located?' subtitle='Help guests find you!'/>
        <CountrySelect  onChange={(value) => setCustomValue('location', value)} value={location}/>
        <Map center={location?.latlng}/>
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Share some basics about your place' subtitle='What amenities do you have?'></Heading>
        <Counter title='Guests' subtitle='How many guests do you allow?' vlaue={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
        <hr />
        <Counter title='Rooms' subtitle='How many rooms do you have?' vlaue={roomCount} onChange={(value) => setCustomValue('roomCount', value)}/>
        <hr />
        <Counter title='Bathrooms' subtitle='How many bathrooms do you have?' vlaue={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)}/>
      </div>
    )
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Add a photo of your place' subtitle='Show guests what your place looks like?'></Heading>
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
      </div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='How would you describe your place?' subtitle='Short and sweet works best!'></Heading>
        <Input id='title' label='Title' disabled={isLoading} register={register} errors={errors} required/>
        <hr />
        <Input id='description' label='description' disabled={isLoading} register={register} errors={errors} required/>
      </div>
    )
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='How would you describe your place?' subtitle='Short and sweet works best!'></Heading>
        <Input id='price' label='Price' formatPrice type='number' disabled={isLoading} register={register} errors={errors} required/>
      </div>
    )
  }
  return (
    <Modal title='Airbnb your home' isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent}
      secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} actionLabel={actionLabel}/>
  )
}

export default RentModal