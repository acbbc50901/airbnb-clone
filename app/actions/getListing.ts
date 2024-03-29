import prisma from '@/app/libs/prismadb'

export interface IListingParms {
  userId? :string,
  locationValue?: string,
  guestCount?: number,
  roomCount? : number,
  bathroomCount?: number,
  startDate? :string,
  endDate? : string,
  category? : string,
}

export default async function getListings( params: IListingParms ) {
  try {

    const { userId, locationValue, bathroomCount, roomCount ,guestCount, startDate,endDate,category } = params

    let query: any = {};
    
    if (userId) {
      query.userId = userId
    }
    if (category) {
      query.category = category
    }
    if (locationValue) {
      query.locationValue = locationValue
    }
    if ( roomCount ) {
      query.roomCount = {
        gte: +roomCount
      }
    }
    if ( guestCount ) {
      query.guestCount = {
        gte: +guestCount
      }
    }
    if ( bathroomCount ) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: {gte: startDate},
                startDate: {lte: startDate},
              },
              {
                startDate: {lte: endDate},
                endDate: {gte: endDate},
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })
    const safeListings = listings.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }))
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}