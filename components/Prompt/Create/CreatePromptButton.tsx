import React from 'react'
import { Button } from '../../ui/button'
import clsx from 'clsx'
import { useFormStatus } from 'react-dom';

export default function CreatePromptButton({extraDisabled, edit}: {extraDisabled?: boolean,edit?:boolean}) {
  const { pending } = useFormStatus();
  return (
    <Button
    className={clsx(pending && 'bg-primary/40 animate-pulse')}
    disabled={extraDisabled ? extraDisabled || pending : pending}
    type='submit'
  >
    {edit ? <p>Save</p> : <p>Create</p>}
  </Button>
  )
}
