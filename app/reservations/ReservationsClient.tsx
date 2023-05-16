'use client'

import   {useCallback, useState} from 'react'
import { SafeUser, SafeReservation } from '@/app/types/index'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import Heading from '../components/Heading'
import Container from '../components/Container'
import ListingCard from '../components/listings/ListingCard'
import { toast } from 'react-hot-toast'


interface Props {
  reservations: SafeReservation[],
  currentUser: SafeUser | null,
}
const ReservationsClient: React.FC<Props> = ({reservations, currentUser}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id :string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled')
        router.refresh();
      }).catch((error) => {
        toast.error('Someing went worng');
        console.log(error);
      }).finally(() => {
        setDeletingId('');
      })
  }, [router])


  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties'/>
      <div className=' mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
      {
        reservations.map((item) => (
          <ListingCard key={item.id} data={item.listing} reservation={item} actionId={item.id} onAction={onCancel} disabled={deletingId === item.id}
            actionLabel='Cancel guest reservation' currentUser={currentUser}/>
          ))
      }
      </div>
    </Container>
  )
}

export default ReservationsClient