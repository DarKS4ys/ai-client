"use client"

import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import clsx from 'clsx'

export default function LogOutButton({callback, className}: {callback: string, className?: string}) {
  return (
    <Button className={clsx('w-full', className)} onClick={() => signOut({callbackUrl: callback})}>Sign Out</Button>
  )
}
