import React from 'react';
import PromptDelete from './PromptDelete';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User } from 'next-auth';

export default function DeletePrompt({user,id}: {user: User | undefined, id: string}) {
  return (
    <>
      <h1 className="text-xl font-semibold text-center">
        Are you sure you want to delete this prompt?
      </h1>
      <div className="flex items-center gap-3">
        <PromptDelete user={user} promptId={id} />
        <DialogClose>
          <Button>Cancel</Button>
        </DialogClose>
      </div>
    </>
  );
}
