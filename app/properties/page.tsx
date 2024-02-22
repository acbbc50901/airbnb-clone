import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListing";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="並無此內容" subtitle="請先登入"/>
      </ClientOnly>
    )
  }
  const listings = await getListings({
    userId: currentUser.id
  })

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="您似乎沒有上架任何房間" subtitle="看來您尚未在airbnb進行上架內容"/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default PropertiesPage;