'use client'

import   { useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import qs from 'query-string'
import { DateRange, Range } from 'react-date-range'
import { formatISO } from 'date-fns'

import useSearchModal from '@/app/hooks/useSearchModal'

import { CountrySelectValue } from '../Inputs/CountrySelect'
import Modal from './Modal'
import CountrySelect from '../Inputs/CountrySelect'
import Heading from '../Heading'
import Calendar from '../Inputs/Calendar'
import Counter from '../Inputs/Counter'


enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dataRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const Map = useMemo(() => dynamic(() => import('../Map'),{
    ssr: false,
  })
  , [])

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, [])

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, [])

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dataRange.startDate) {
      updatedQuery.startDate = formatISO(dataRange.startDate);
    }

    if (dataRange.endDate) {
      updatedQuery.endDate = formatISO(dataRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true})

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  },[step, searchModal, location, router, guestCount, bathroomCount, roomCount, dataRange, onNext, params])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return '搜尋'
    }

    return '下一步'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return '上一步'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='想去哪裡玩?' subtitle='找尋你想去的最佳地點!'/>
      <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)}/>
      <hr />
      <Map center={location?.latlng}/>
    </div>
  )
  
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='什麼時候開啟你的旅行?' subtitle='確認你任何時間都ＯＫ！'/>
        <Calendar value={dataRange} onChange={(value) => setDateRange(value.selection)}/>
    </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='詳細資訊' subtitle='找到屬於你的完美地點'/>
        <Counter title='人數' subtitle='有多少人會一起入住?' vlaue={guestCount} onChange={(value) => setGuestCount(value)}/>
        <Counter title='房間' subtitle='需要多少房間?' vlaue={roomCount} onChange={(value) => setRoomCount(value)}/>
        <Counter title='浴室' subtitle='需要多少浴室?' vlaue={bathroomCount} onChange={(value) => setBathroomCount(value)}/>
    </div>
    )
  }
  return (
    <div>
      <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack} title='篩選' actionLabel={actionLabel} body={bodyContent}/>
    </div>
  )
}

export default SearchModal