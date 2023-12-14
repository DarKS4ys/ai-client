'use client'

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'next-auth';
import React, { useState } from 'react';
import { toast } from 'sonner';
import ColorPicker from '../ColorPicker';
import { editPrompt } from '@/actions/actions';
import CreatePromptButton from './Create/CreatePromptButton';

export default function EditPrompt({user, title, prompt, color, id}: {id: string, title: string, prompt: string, user: User | undefined, color: string}) {
  const [selectedColor, setSelectedColor] = useState<string>(color);

  const [noFilledInput, setNoFilledInput] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setNoFilledInput(value.trim() === '');
  };

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);

    setNoFilledInput(false);
  };

  return (
    <form className='flex flex-col gap-3' action={async (formData) => {
      if (user?.id && user.status == 'Admin') {
        console.log(formData)

        const {data, error} = await editPrompt(formData, user?.id, selectedColor, id)
        toast.success(`Succesfully edited prompt ${data?.name}`);
        if (error) {
          toast.error(error);
          return;
        }
      } else {
        toast.error("You are not authorised to take this action")
      }
    }}>
      <h1 className="text-xl font-semibold mb-2">Edit Prompt</h1>

      <div className="flex flex-col gap-1">
        <h3>New Name</h3>
        <Input
          maxLength={500}
          name="name"
          placeholder={title}
          type="text"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3>New Prompt</h3>
        <Textarea
          maxLength={5000}
          name="prompt"
          placeholder={prompt}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3>New Color</h3>
        <ColorPicker predefinedColor={color} onColorChange={handleColorChange} />
      </div>

      <div className="flex justify-end items-center gap-3">
        <CreatePromptButton extraDisabled={noFilledInput} edit/>
        <DialogClose>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Cancel</Button>
        </DialogClose>
      </div>
    </form>
  );
}
