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
import EditPrompt from '../EditPrompt';
import DeletePrompt from '../DeletePrompt';
import { truncateText } from '@/lib/utils';

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
            <button className="hover:scale-110 active:scale-95 dark:bg-primary/20 bg-primary/80 dark:hover:bg-primary hover:bg-primary dark:text-white dark:hover:text-accent text-accent p-3 rounded-full transition duration-200">
              <BiPencil />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[85%] sm:w-[30rem] flex flex-col justify-center gap-3">
            <EditPrompt id={id} color={color} user={user} title={title} prompt={prompt}/>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button className="hover:scale-110 active:scale-95 dark:bg-primary/20 dark:hover:bg-red-500 bg-primary/80 hover:bg-red-500 dark:text-white  text-accent p-3 rounded-full transition duration-200">
              <BsTrash />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[80%] sm:w-80 flex flex-col items-center justify-center gap-3">
            <DeletePrompt user={user} id={id}/>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-light text-muted-foreground font-sm">{truncateText(prompt, 100)}</p>
      <div className="w-64 absolute justify-center bottom-0 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 mt-4 dark:blur-[110px] blur-[100px] transition duration-500" />
    </div>
  );
}
