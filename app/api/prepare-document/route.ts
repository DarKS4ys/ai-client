import { authOptions } from "@/lib/auth";
import { prepareAndEmbedPDF } from "@/scripts/pinecone-prepare-docs";
import { getServerSession } from "next-auth";

interface PrepareDocumentRequest {
  url: string;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  const body: PrepareDocumentRequest = await request.json();

  const { url } = body;

  if (session?.user?.status === 'Admin') {
    try {
      await prepareAndEmbedPDF(url);
      return new Response(JSON.stringify({ success: true, message: "PDF prepared and embedded successfully" }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: "Internal server error" }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else {
    return new Response(JSON.stringify({ success: false, message: "You have to be an admin to upload PDFs." }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}