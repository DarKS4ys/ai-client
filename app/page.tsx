import AdminCard from "@/components/AdminCard";
import Chat from "@/components/Chat";
import { FileCard } from "@/components/FileCard/FileCard";
import Upload from "@/components/Upload";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";

export default async function ChatPage() {
 const session = await getServerSession(authOptions);

/*   const files = await prisma.file.findMany({
    orderBy: { id: 'desc' },
    include: { user: true },
  }); */

  /*
  if (session?.user.status != 'Admin') {
    throw new Error('You need to be an admin')
  } */

  return (
    <div className='py-10 px-4 md:p-12'>
{/*       <div className="max-w-6xl mx-auto flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminCard
            title="Upload a new file"
            description="Transfer a new file to edgestore using the input below."
          >
          <Upload session={session}/>
        </AdminCard>

        <AdminCard
          title="Edit AI Prompts"
          description="Add, edit or delete the AI prompts that will be used to get data."
          href="/prompts"
          gradient2
          />
        </div>

        <Chat/>

        <h1 className="text-3xl font-semibold">Uploaded Files</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard session={session} file={file} key={file.id}/>
          ))}
        </div>
        <Toaster closeButton/>
      </div> */}
    </div>
  );
}