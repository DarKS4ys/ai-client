import Image from 'next/image';
import UserAuthForm from './UserAuthForm';
import Logo from '@/public/SavillsLogo.png'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Button } from './ui/button';
import Link from 'next/link';
import LogOutButton from './LogOutButton';

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const SignIn = async (props: Props) => {
  const session = await getServerSession(authOptions)

  return (
    <div className="container mx-auto flex w-full my-4 flex-col justify-center sm:w-[w-400px]">
      <div className="flex flex-col items-center gap-4">
        <Image alt="Savills Logo" src={Logo} height={92} width={92} className='w-16 h-16 rounded'/>
        {session ?
          <div className="justify-center items-center flex flex-col gap-2">
            <h1 className="font-semibold text-3xl tracking-tight">Welcome back, {session.user.name}</h1>
            <p className='text-lg'>You are already logged in.</p>
            <div className='flex gap-2 items-center'>
              <Link href={'/'}>
                <Button>
                  Return to dashboard
                </Button>
              </Link>

              <LogOutButton className=" dark:bg-red-500 bg-red-600 text-white w-2/4 hover:bg-red-500 dark:hover:bg-red-600" callback='/sign-in'/>
            </div>
          </div>
        :
        <>
          <h1 className="font-semibold text-3xl tracking-tight">Login to your account</h1>
          <UserAuthForm callbackUrl={props.callbackUrl}/>
        </>
        }
      </div>
    </div>
  );
};

export default SignIn;
