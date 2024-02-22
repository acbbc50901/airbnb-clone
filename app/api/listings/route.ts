import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST( req: Request, ) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await req.json();
  const { category, location, guestCount, roomCount, bathroomCount, imageSrc, price, title, description} = body
  console.log(currentUser);
  const listing = await prisma.listing.create({
    data: {category, locationValue: location.value, guestCount,userId:  currentUser.id ,roomCount, bathroomCount, imageSrc, price: parseInt(price,10), title, description}
  })

return NextResponse.json(listing);

}