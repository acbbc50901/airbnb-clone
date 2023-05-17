import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modal/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modal/LoginModal'
import RentModal from './components/modal/RentModal'
import SearchModal from './components/modal/SearchModal'
import getCurrentUser from './actions/getCurrentUser'
const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'auto';

export const metadata = {
  title: 'airBnb Clors',
  description: '作品集用 不做任何商業使用',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
          <ClientOnly>
            <ToasterProvider/>
            <SearchModal/>
            <RegisterModal/>
            <LoginModal/>
            <RentModal/>
            <Navbar currentUser={currentUser}/>
          </ClientOnly>
          <div className='pb-20 pt-28'>
            {children}
          </div>
      </body>
    </html>
  )
}
