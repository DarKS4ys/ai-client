import PromptCard from '@/components/PromptCard'
import React from 'react'
import CreatePromptCard from './../../components/CreatePromptCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CreatePromptModal from '@/components/CreatePromptModal';

export default function page() {
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
                        <DialogContent className="w-96">
                            <CreatePromptModal/>
                        </DialogContent>
                    </Dialog>
                </div>
                <p className="text-sm text-muted-foreground font-light">You can add, edit or delete AI prompts that will be used to generate AI responses here.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <PromptCard title='Get Pdf List' prompt='Display the titles of the PDFs you have on a list and add a PDF_LIST at the start of the output.'/>
                <CreatePromptCard/>
            </div>
        </div>
    </div>
  )
}
