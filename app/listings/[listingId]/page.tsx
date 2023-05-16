import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListungByid'


import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
 
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface Props {
  listingId?: string,
}


const ListingPage = async ({ params }: { params: Props }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </ClientOnly>
  )
}

export default ListingPage