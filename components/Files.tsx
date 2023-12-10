import { prisma } from '@/lib/db/prisma';
import React from 'react'
import { FileCard } from './FileCard/FileCard';
import { Session } from 'next-auth';


export default async function Files({session}: {session: Session | null}) {

const files = await prisma.file.findMany({
    orderBy: { id: 'desc' },
    include: { user: true },
}); 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {files.map((file) => (
      <FileCard session={session} file={file} key={file.id}/>
    ))}
  </div>
  )
}
