"use client"

import type { Session } from "next-auth"
import Image from "next/image"
import profilePicPlaceholder from '@/public/profile-pic-placeholder.png'
import { signIn, signOut } from "next-auth/react"
import { AiOutlineMenu } from 'react-icons/ai';
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { truncateText } from "@/lib/utils"
import LogOutButton from "./LogOutButton"
import Link from "next/link"
import { BsGear } from "react-icons/bs"

interface UserMenuButtonProps {
    session: Session | null
}

export default function UserMenuButton({session}: UserMenuButtonProps) {

    const user = session?.user
  return (
    <div className="flex items-center">
        {user ? 
            <div className="flex gap-2 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image src={user?.image || profilePicPlaceholder} alt="Profile Picture" width={64} height={64} className="border border-border w-12 rounded-full aspect-square" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                    <DropdownMenuLabel>
                            <div>
                                <span className="flex justify-between gap-2 items-center font-medium">
                                    
                                    <h1 className="text-lg">{truncateText(user.name, 12)}</h1>

                                    -

                                    <h2 className="text-lg">
                                        {user.status}
                                    </h2>
                                </span>
                                <h1 className="text-sm text-muted-foreground font-light">{truncateText(user.email, 25)}</h1>
                            </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator/>

                    {user.status == 'Admin' &&
                        <Link href='/prompts'>
                            <DropdownMenuItem className="cursor-pointer gap-3 flex text-lg items-center opacity-90 hover:opacity-100 transition">
                            <BsGear />
                                <h1>Edit Prompts</h1>
                            </DropdownMenuItem>
                        </Link>
                    }

                        <DropdownMenuSeparator/>

                    <LogOutButton className="mt-1" callback="/sign-in"/>
                     
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        :
            <div>
                <Button onClick={() => signIn()}>Sign In</Button> 
            </div>
        }
    </div>
  )
}
