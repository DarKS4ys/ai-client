import React from 'react';
import { BiPencil } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import PromptDelete from './PromptDelete';
import { User } from 'next-auth';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PromptCardProps {
  title: string;
  prompt: string;
  id: string;
  color: string;
  user: User | undefined;
}

export default function PromptCard({
  title,
  prompt,
  color,
  id,
  user,
}: PromptCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-xl flex flex-col gap-2 items-start justify-center p-10 dark:from-accent dark:to-card/80 bg-gradient-to-br from-accent/60 to-muted-foreground/20 border-dashed border-2 hover:border-primary border-primary/70 dark:border-primary/50 dark:hover:border-primary transition duration-300">
      <div className="sm:opacity-0 sm:group-hover:opacity-100 gap-2 flex absolute top-3 right-3 z-20 transition duration-300">
        <Dialog>
          <DialogTrigger asChild>
            <button className="hover:scale-110 active:scale-95 bg-primary/20 hover:bg-primary dark:text-white dark:hover:text-accent text-accent p-3 rounded-full transition duration-200">
              <BiPencil />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[85%] sm:w-[30rem] flex flex-col justify-center gap-3">
            
            <h1 className="text-xl font-semibold mb-2">
              Edit Prompt
            </h1>

            <div className='flex flex-col gap-1'>
              <h3>New Name</h3>
              <Input required maxLength={500} name="name" placeholder={title} type="text" />
            </div>

            <div className='flex flex-col gap-1'>
            <h3>New Prompt</h3>
            <Textarea required maxLength={5000} name="prompt" placeholder={prompt} />
            </div>

            <div className="flex justify-end items-center gap-3">
              <DialogClose>
                <Button>Cancel</Button>
              </DialogClose>
            </div>

          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button className="hover:scale-110 active:scale-95 bg-primary/20 hover:bg-red-500 dark:text-white  text-accent p-3 rounded-full transition duration-200">
              <BsTrash />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[80%] sm:w-80 flex flex-col items-center justify-center gap-3">
            <h1 className="text-xl font-semibold text-center">
              Are you sure you want to delete this prompt?
            </h1>
            <div className="flex items-center gap-3">
              <PromptDelete user={user} promptId={id} />
              <DialogClose>
                <Button>Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-light text-muted-foreground font-sm">{prompt}</p>
      <div className="w-64 absolute justify-center bottom-0 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 mt-4 dark:blur-[110px] blur-[100px] transition duration-500" />
    </div>
  );
}
