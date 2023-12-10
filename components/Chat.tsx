'use client';

import React, { useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { useChat } from 'ai/react';
import { getSources, initialMessages, scrollToBottom } from '@/lib/utils';
import { ChatLine } from './ChatLine';
import { Button } from './ui/button';
import { FaSpinner } from 'react-icons/fa';

export default function Chat() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    data,
    append,
  } = useChat({
    initialMessages,
    body: {
      prompt: 'Display the titles of the PDFs you have on a list and add a PDF_LIST at the start of the output.',
    },
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
      <div className="p-4 flex gap-2 w-ful">
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={() => {
            append({
              role: 'user',
              content: 'List me the PDF files',
            });
          }}
        >
          Get PDF List
        </Button>
      </div>

{/*       <form
        onSubmit={handleSubmit}
        className="p-4 flex gap-2 clear-both items-end"
      >
        <textarea
          ref={textareaRef}
          className="flex border boder-border p-[10px] text-sm items-center justify-center rounded-md w-full outline-none resize-none max-h-[300px] bg-transparent scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-600"
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          placeholder={'You are not allowed to send messages.'}
          rows={1}
        />

        <Button type="submit" className="w-24" disabled={isLoading}>
          {isLoading ? <FaSpinner className="animate-spin" /> : 'Ask'}
        </Button>
      </form> */}
    </div>
  );
}
