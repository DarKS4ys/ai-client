import { truncateText } from '@/lib/utils'
import type { Prompt } from '@prisma/client'
import { useChat } from 'ai/react';
import React from 'react'

export default function PromptComponent({onClick, append, prompt}: {onClick: any, append: any; prompt: Prompt}) {
  return (
    <button  
    onClick={() => {
        append({
          role: 'user',
          content: prompt.prompt,
        });

        onClick()
      }}
    className="bg-primary/10 hover:bg-border border border-border p-4 rounded-lg transition duration-200 flex flex-col gap-2 items-start">
        <h1>{prompt.name}</h1>
        <h1>{truncateText(prompt.prompt, 40)}</h1>
    </button>
  )
}

