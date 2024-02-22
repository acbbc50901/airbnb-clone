 
import { SafeListing, SafeReservation, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'

interface Props {
  listings: SafeListing[],
  currentUser: SafeUser | null,
}
const FavoritesClient: React.FC<Props> = ({listings, currentUser}) => {
  return (
    <Container>
      <Heading title='你的最愛' subtitle='下列是你的最愛內容'/>
      <div className=' mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
      {
        listings.map((item) => (
          <ListingCard key={item.id} data={item}  currentUser={currentUser}/>
        ))
      }
      </div>
    </Container>
  )
}

export default FavoritesClient