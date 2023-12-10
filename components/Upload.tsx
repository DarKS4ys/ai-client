'use client';

import * as React from 'react';
import { useEdgeStore } from '../lib/edgestore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import clsx from 'clsx';
import { getDownloadUrl } from '@edgestore/react/utils';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { saveFileToDB } from '@/actions/actions';
import {FiLoader} from 'react-icons/fi'

export default function Upload({session}: {session: Session | null}) {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>()
  const [loading, setLoading] = React.useState<boolean>(false)

  const { edgestore } = useEdgeStore();

  const isAdmin = session?.user?.status === 'Admin';

  return (
    <div className='flex flex-col gap-4 items-center'>
        <div className="flex gap-2">
        <Input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
         <Button
          disabled={!isAdmin || loading || !file}
          className={clsx((!isAdmin || loading) && 'bg-primary/20 animate-pulse')}
          onClick={async () => {
            if (isAdmin && file) {
              setLoading(true);
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  setProgress(progress);
                },
              });
              try {
                const downloadUrl = getDownloadUrl(res.url);

                const result = await saveFileToDB(res.url, downloadUrl, session?.user.id);

                toast.success(result.message);

                const response = await fetch('/api/prepare-document', {
                  method: 'POST',
                  body: JSON.stringify({ url: res.url }),
                });
                if (response.ok) {
                  const data = await response.text();
                  console.log('API DATA: ' + data);
                } else {
                  console.error('Failed to fetch data');
                }

                console.log('Document preparation successful!');
              } catch (error) {
                if (typeof error === 'string') {
                  toast.error(error);
                }
              } finally {
                setLoading(false);
              }
              console.log('Client Data: ' + res.url);
            }
          }}
        >
          Upload
          {loading &&
          <FiLoader className="animate-spin"/>
          }
        </Button>
      </div>
      {progress !== undefined && progress !== null && progress !== 100 && progress > 1 && (
        <Progress value={progress} />
      )}
    </div>
  );
}