import { File } from '@prisma/client';
import { Session, User } from 'next-auth';
import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog';
import { IoMdClose } from 'react-icons/io';
import Delete from './FileDelete';
import { Button } from '../ui/button';
import { AiFillEye } from 'react-icons/ai';
import Image from 'next/image';
import CopyToClipboardButton from './Clipboard';
import { BiDownload, BiVideo } from 'react-icons/bi';
import { FaFilePdf } from 'react-icons/fa';
import Link from 'next/link';
import ProfileImg from '@/public/profile-pic-placeholder.png';
import { truncateText } from '@/lib/utils';
import { FiExternalLink } from 'react-icons/fi';

interface FileCardProps {
  session: Session | null;
  file: File & { user: User }; // Combine FileType with User type
}

export const FileCard: React.FC<FileCardProps> = ({ session, file }) => (
  <div className="flex flex-col gap-4 rounded-xl p-10 bg-primary/10 mx-auto w-full">
    <div className="relative group w-full h-80 aspect-square rounded-lg">
      {session?.user.status == 'Admin' && (
        <Dialog>
          <DialogTrigger className="absolute -right-4 -top-4 z-40 p-2 bg-red-500 dark:hover:bg-red-600 hover:bg-red-400 hover:scale-110 active:scale-95 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200">
            <IoMdClose size={20} />
          </DialogTrigger>
          <DialogContent className="w-80 flex flex-col items-center justify-center gap-4 py-6">
            <h1 className="text-xl font-semibold text-center">
              Are you sure you want to delete this file?
            </h1>
            <div className="flex items-center gap-3">
              <Delete
                user={session.user}
                fileUrl={file.fileUrl}
                fileId={file.id}
                type="file"
              />
              <DialogClose>
                <Button>Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Link href={file.fileUrl} target='_blank' rel="noopener noreferrer" className="absolute -right-4 top-8 z-40 p-2 bg-green-600 hover:bg-green-400 dark:hover:bg-green-700 hover:scale-110 active:scale-95 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200">
        <FiExternalLink size={20}/>
      </Link>
      <div className="z-20 absolute flex gap-2 top-0 left-0 rounded-lg bg-black/40 dark:bg-black/60 group-hover:backdrop-blur w-full h-full items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 text-white flex flex-col items-center hover:scale-110 active:scale-90 transition duration-200">
              <AiFillEye size={52} />
              View
            </button>
          </DialogTrigger>
          <DialogContent className="uppercase w-[80vw] text-lg font-medium pb-10 items-center flex flex-col">
            <h1>Preview</h1>
            {file.fileUrl.endsWith('.pdf') && (
              <iframe
                src={`https://docs.google.com/gview?url=${file.fileUrl}&embedded=true`}
                className="w-full h-[75vh] rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
        <div className="h-20 w-0.5 bg-white/50" />
        <CopyToClipboardButton
          textToCopy={file.fileUrl}
          buttonText="Copy link"
        />
      </div>
      { file.fileUrl.endsWith('.pdf') && (
        <FaFilePdf className="justify-center items-center w-full h-full flex p-8" />
      )}
    </div>
    <div className="flex gap-2 items-center font-medium">
      <div className="relative overflow-hidden min-w-[2.5rem] w-10 h-10 aspect-square rounded-full">
        <Image
          fill
          className="object-cover"
          alt="File"
          src={file.user.image || ProfileImg}
        />
      </div>
      <h1>{truncateText(file.user.name,18)}</h1>
      <Link className="ml-auto" href={file.downloadUrl}>
        <Button className="gap-2">
          <BiDownload />
          Download
        </Button>
      </Link>
    </div>
  </div>
);
