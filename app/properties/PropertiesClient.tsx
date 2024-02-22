'use client'
import   { useCallback, useState } from 'react'
import { SafeListing, SafeReservation, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface Props {
  listings: SafeListing[],
  currentUser: SafeUser | null,
}

const PropertiesClient: React.FC<Props> = ({listings, currentUser}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('listings deleted');
        router.refresh();
      }).catch((error) => {
        toast.error(error?.response?.data?.error);
        console.log(error);
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router])

  return (
    <Container>
      <Heading title='房間資產' subtitle="下列是您的坊間資產"/>
      <div className=' mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          listings.map((item) => (
            <ListingCard key={item.id} data={item}  actionId={item.id} onAction={onCancel} disabled={deletingId === item.id}
              actionLabel='刪除這套房' currentUser={currentUser}/>
          ))
        }
      </div>
    </Container>
  )
}

export default PropertiesClient