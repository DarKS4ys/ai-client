import React from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import CreatePromptModal from './CreatePromptModal';
import type { User } from 'next-auth';

export default function PromptCard({ user }: {user: User | undefined}) {
  return (
    <Dialog>
        <DialogTrigger>
        <div
          className='opacity-60 hover:opacity-100 relative group overflow-hidden rounded-xl flex flex-col gap-2 items-center justify-center p-10 border-dashed border-2 hover:border-primary border-primary/60 transition duration-300'>
          <AiFillPlusCircle size={72} className="group-hover:scale-110 transition duration-300"/>
          <h1 className="text-2xl font-semibold">Create new prompt</h1>
          <div className="w-64 absolute justify-center bottom-0 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 mt-4 dark:blur-[110px] blur-[100px] transition duration-500" />
        </div>
        </DialogTrigger>
        <DialogContent className="w-[85%] sm:w-96">
          <CreatePromptModal user={user}/>
        </DialogContent>
    </Dialog>
  )
}
