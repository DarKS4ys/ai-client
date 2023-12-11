"use client"

import { deletePrompt } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { User } from 'next-auth'
import React, { useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { toast } from 'sonner'

export default function PromptDelete({user, promptId}: {user: User | undefined, promptId: string}) {
    const [loading, setLoading] = useState(false)

    const handlePromptDelete = async () => {
        try {
            setLoading(true)
            if (user?.status == 'Admin') {
                setLoading(true)
                const response = await deletePrompt(promptId)

                toast.success(response.message);
            } else {
                toast.error("You need to be an admin")
            }
        } catch (error) {
            console.log(error)
            if (typeof error === 'string') {
                toast.error(error);
            }
        } finally {
            setLoading(false)
        }
    }

  return (
    <Button
      disabled={loading}
      className={clsx(
        'bg-red-600 hover:bg-red-700 text-white',
        loading && 'bg-primary/20 animate-pulse'
      )}
      onClick={handlePromptDelete}
    >
      Delete
    </Button>
  )
}
