 
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import ReservationsClient from './ReservationsClient'

const ReservationsPage = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return(
      <ClientOnly>
        <EmptyState title='並無權限' subtitle='請先登入'/>
      </ClientOnly>
    )
  }
  const reservations = await getReservations({
    authorId: currentUser.id
  })

  if (reservations.length === 0) {
    return(
      <ClientOnly>
        <EmptyState title='並無找到預定行程' subtitle='您似乎沒有預定的行程'/>
      </ClientOnly>
    )
  }


  return (
    <ClientOnly>
      <ReservationsClient reservations={reservations} currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default ReservationsPage