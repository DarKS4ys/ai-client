'use client';
import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import ColorPicker from '../../ColorPicker';
import { toast } from 'sonner';
import type { User } from 'next-auth';
import CreatePromptButton from './CreatePromptButton';
import { createPrompt } from '@/actions/actions';

export default function CreatePromptModal({ user }: {user: User | undefined}) {
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');

  return (
    <>
      <h1 className="font-semibold text-xl">Create new prompt</h1>
      <form
        className="flex flex-col gap-2"
        action={async (formData) => {
          if (user?.id && user.status == 'Admin') {
            const { error, data } = await createPrompt(formData, user?.id, selectedColor);       
            toast.success(`Succesfully created prompt ${data?.name}`);

            if (error) {
              toast.error(error);
              return;
            }
          } else {
            toast.error("You are not authorised to take this action")
          }
        }}
      >
        <Input required maxLength={500} name="name" placeholder="Prompt name" type="text" />
        <Textarea required maxLength={5000} name="prompt" placeholder="Prompt content" />
        <ColorPicker onColorChange={setSelectedColor} />
        <CreatePromptButton/>
      </form>
    </>
  );
};
