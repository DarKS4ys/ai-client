import PromptCard from '@/components/Prompt/PromptCard/PromptCard'
import React from 'react'
import CreatePromptCard from '../../components/Prompt/Create/CreatePromptCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CreatePromptModal from '@/components/Prompt/Create/CreatePromptModal';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { truncateText } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Prompt Editor - Savills AI',
    description: 'Savills AI App - Prompt Creation',
}

export default async function page() {

    const session = await getServerSession(authOptions)

    const prompts = await prisma.prompt.findMany()

  return (
    <div className='py-10 px-4 md:p-12'>
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <h1 className="text-3xl font-semibold">AI Prompt Editor - WORK IN PROGRESS</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Create Prompt</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[85%] sm:w-96">
                            <CreatePromptModal user={session?.user}/>
                        </DialogContent>
                    </Dialog>
                </div>
                <p className="text-sm text-muted-foreground font-light">You can add, edit or delete AI prompts that will be used to generate AI responses here.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {prompts.map((prompt) => (
                    <PromptCard key={prompt.id} user={session?.user} color={prompt.color} id={prompt.id} title={prompt.name} prompt={truncateText(prompt.prompt, 100)}/>
                ))}
                <CreatePromptCard user={session?.user}/>
            </div>
        </div>

        <Toaster closeButton/>
    </div>
  )
}
