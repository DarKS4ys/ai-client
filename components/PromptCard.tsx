import React from 'react'
import { BiPencil } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

interface PromptCardProps {
    title: string;
    prompt: string;
}

export default function PromptCard({title, prompt}: PromptCardProps) {
  return (
    <div className='relative group overflow-hidden rounded-xl flex flex-col gap-2 items-start justify-center p-10 dark:from-accent dark:to-card/80 bg-gradient-to-br from-accent/60 to-muted-foreground/20 border-dashed border-2 hover:border-primary border-primary/60 transition duration-300'>
        <div className='opacity-0 group-hover:opacity-100 gap-2 flex absolute top-3 right-3 z-20 transition duration-300'>
            <button className="bg-primary/20 hover:bg-primary dark:text-white dark:hover:text-accent text-accent p-3 rounded-full transition duration-200">
                <BiPencil/>
            </button>
            <button className="bg-primary/20 hover:bg-red-500 dark:text-white  text-accent p-3 rounded-full transition duration-200">
                <BsTrash/>
            </button>
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-light text-muted-foreground font-sm">{prompt}</p>
        <div className="w-64 absolute justify-center bottom-0 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 mt-4 dark:blur-[110px] blur-[100px] transition duration-500" />
    </div>
  )
}
