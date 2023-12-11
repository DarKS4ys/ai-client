import React from 'react'
import { Button } from '../../ui/button'
import clsx from 'clsx'
import { useFormStatus } from 'react-dom';

export default function CreatePromptButton() {
  const { pending } = useFormStatus();
  return (
    <Button
    className={clsx(pending && 'bg-primary/40 animate-pulse')}
    disabled={pending}
    type='submit'
  >
    Create
  </Button>
  )
}
