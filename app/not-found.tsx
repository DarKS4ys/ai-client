import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/SavillsLogo.png'
 
export default function NotFound() {
  return (
    <div className='flex flex-col py-[24dvh] items-center justify-center gap-4'>
      <Image alt='Stoic Logo' src={Logo} placeholder='blur' className='rounded w-20 h-20 mb-2'/>
      <h2 className='text-7xl font-medium leading-[3rem]'>404</h2>
      <h3 className='text-2xl 2xl:text-3xl font-medium'>Page not found</h3>
      <Link href="/">
        <Button variant={'outline'}>Take me back to homepage</Button>
      </Link>
    </div>
  )
}