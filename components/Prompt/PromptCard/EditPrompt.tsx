import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export default function EditPrompt({title, prompt}: {title: string, prompt: string}) {
  return (
    <>
      <h1 className="text-xl font-semibold mb-2">Edit Prompt</h1>

      <div className="flex flex-col gap-1">
        <h3>New Name</h3>
        <Input
          required
          maxLength={500}
          name="name"
          placeholder={title}
          type="text"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3>New Prompt</h3>
        <Textarea
          required
          maxLength={5000}
          name="prompt"
          placeholder={prompt}
        />
      </div>

      <div className="flex justify-end items-center gap-3">
        <DialogClose>
          <Button>Cancel</Button>
        </DialogClose>
      </div>
    </>
  );
}
