'use client'
import   { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface Props {
  reservations: SafeReservation[],
  currentUser: SafeUser | null,
}

const TripsClient: React.FC<Props> = ({reservations, currentUser}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation canfelled');
        router.refresh();
      }).catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router])

  return (
    <Container>
      <Heading title='行程' subtitle="您即將出發的行程"/>
      <div className=' mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          reservations.map((item) => (
            <ListingCard key={item.id} data={item.listing} reservation={item} actionId={item.id} onAction={onCancel} disabled={deletingId === item.id}
              actionLabel='取消你的行程' currentUser={currentUser}/>
          ))
        }
      </div>
    </Container>
  )
}

export default TripsClient