'use client';

import React, { useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { useChat } from 'ai/react';
import {
  getSources,
  initialMessages,
  scrollToBottom,
  truncateText,
} from '@/lib/utils';
import { ChatLine } from './ChatLine';
import { Button } from './ui/button';
import { FaSpinner } from 'react-icons/fa';
import { Prompt } from '@prisma/client';
import PromptComponent from './Prompt';
import clsx from 'clsx';

export default function Chat({ prompts }: { prompts: Prompt[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { messages, input, isLoading, data, append, handleSubmit, setInput } =
    useChat({
      initialMessages,
      /*     body: {
      prompt: prompts[1].prompt,
    }, */
    });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  useEffect(() => {
    const adjustRows = () => {
      if (textareaRef.current) {
        const currentTextarea = textareaRef.current;

        currentTextarea.style.height = 'auto'; // Reset the height
        currentTextarea.style.height = currentTextarea.scrollHeight + 'px';
        if (currentTextarea.scrollHeight >= 300) {
          currentTextarea.style.overflowY = 'auto'; // Add a scrollbar when the height is at least 200px
        } else {
          currentTextarea.style.overflowY = 'hidden'; // Remove the scrollbar when the height is less than 200px
        }
      }
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener('input', adjustRows);
      adjustRows();
    }
  }, []);

  console.log(input);
  console.log(prompts);

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.length > 0 &&
          messages.map((m, index) => (
            <ChatLine
              key={m.id}
              role={m.role}
              content={m.content}
              sources={data?.length ? getSources(data, m.role, index) : []}
              id={m.id}
            />
          ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex gap-2 mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 p-4 gap-2 mt-auto">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              type="submit"
              onClick={() => {
                setInput(prompt.prompt);
                /* append({
                  role: 'user',
                  content: prompt.prompt,
                }); */
              }}
              className={clsx(
                'hover:bg-border text-start border border-border p-4 rounded-lg transition duration-200 flex flex-col gap-2 items-start',
                isLoading && 'bg-primary/40 hover:bg-primary/40'
              )}
              style={{ 
                backgroundColor: `rgba(${parseInt(prompt.color.slice(-6, -4), 16)}, ${parseInt(prompt.color.slice(-4, -2), 16)}, ${parseInt(prompt.color.slice(-2), 16)}, 0.5)`, 
              }}
            >
              <h1>{prompt.name}</h1>
              <h1>{truncateText(prompt.prompt, 40)}</h1>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
