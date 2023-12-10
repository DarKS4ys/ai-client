"use server"

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const session = getServerSession(authOptions)

export async function saveFileToDB(fileUrl: string, downloadUrl: string, userId: string | undefined) {
    try {
      const userSession = await session;

      if (userSession?.user?.status !== 'Admin') {
        throw new Error("You don't have permission to perform this action");
      }

      await prisma.file.create({
        data: {
          fileUrl: fileUrl,
          downloadUrl: downloadUrl,
          user: { connect: { id: userId } },
        }
      })
  
      revalidatePath('/');
  
      return { success: true, message: "File uploaded successfully" };
    } catch (error) {
      throw new Error("Something went wrong while saving file to database")
    }
  }

export async function deleteFile(fileId: string) {
    try {

      const userSession = await session;

      if (userSession?.user?.status !== 'Admin') {
        throw new Error("You don't have permission to perform this action");
      }

      await prisma.file.delete({
        where: { id: fileId }
      })
      
      revalidatePath('/');
      
      return { success: true, message: "File deleted successfully" };
    } catch (error) {
      throw new Error("Something went wrong while deleting the file")
    }
}

//!!! THIS NEEDS MORE SECURITY - ADD SERVER-SIDE ADMIN CHECK WHEN YOU HAVE TIME!!!
  