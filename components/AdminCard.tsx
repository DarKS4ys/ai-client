import React, { ReactNode } from 'react';
import { Button } from './ui/button';
import clsx from 'clsx';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

interface AdminCardProps {
  title: string;
  description?: string;
  href?: string;
  gradient?: boolean;
  gradient2?: boolean;
  children?: ReactNode;
  compact?: boolean
}

export default function AdminCard({
  title,
  description,
  href,
  gradient,
  gradient2,
  children,
  compact
}: AdminCardProps) {

  return (
    <div
    className={clsx(
      'relative group overflow-hidden rounded-xl flex flex-col items-start justify-center',
      compact ? 'p-[1.25rem] gap-[0.1rem]' : 'p-10 gap-2',
      gradient
        ? 'bg-gradient-to-b from-accent/60 to-primary/30'
        : gradient2
        ? 'bg-gradient-to-br dark:from-destructive-foreground/5 from-black/5 dark:to-destructive/50 to-destructive/40'
        : 'dark:from-accent dark:to-card/80 bg-gradient-to-br from-accent/60 to-muted-foreground/30'
    )}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-light text-muted-foreground font-sm">{description}</p>
      {children}
      {href && (
        <Link href={href}>
          <Button className="gap-2 group">
            Take me there
            <BsArrowRight />
          </Button>
        </Link>
      )}

      <div className="w-64 absolute justify-center bottom-0 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 mt-4 dark:blur-[110px] blur-[100px] transition duration-500" />
    </div>
  );
}
