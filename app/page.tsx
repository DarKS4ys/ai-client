import AdminCard from "@/components/AdminCard";
import Chat from "@/components/Chat";
import { FileCard } from "@/components/FileCard/FileCard";
import Upload from "@/components/Upload";
import { redirect } from 'next/navigation';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
import Files from "@/components/Files";

export default async function ChatPage() {
 const session = await getServerSession(authOptions);

/*   if (session?.user.status != 'Admin') {
    throw new Error('You need to be an admin')
  } */

  if (session?.user.status != 'Admin') {
    redirect('/sign-in?callbackUrl=/');
  }


  return (
    <div className='py-10 px-4 md:p-12'>
    <div className="max-w-6xl mx-auto flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminCard
            title="Upload a new PDF"
            description="Transfer a new PDF to database using the input below."
          >
          <Upload session={session}/>
        </AdminCard>

        <AdminCard
          title="Edit AI Prompts"
          description="Add, edit or delete AI prompts that will be used to generate AI responses."
          href="/prompts"
          gradient2
          />
        </div>

        <Chat/>

        <h1 className="text-3xl font-semibold">Uploaded Files</h1>
        <Files session={session}/>

        <Toaster closeButton/>
      </div>
    </div>
  );
}