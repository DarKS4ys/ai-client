"use server"

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { extractErrorMessage, validateString } from "@/lib/utils";
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

export async function deletePrompt(promptId: string) {
  try {

    const userSession = await session;

    if (userSession?.user?.status !== 'Admin') {
      throw new Error("You don't have permission to perform this action");
    }

    await prisma.prompt.delete({
      where: { id: promptId }
    })
    
    revalidatePath('/prompts');
    
    return { success: true, message: "Prompt deleted successfully" };
  } catch (error) {
    throw new Error("Something went wrong while deleting the prompt")
  }
}

export const createPrompt = async (formData: FormData, userId: string, color: string) => {
  const prompt = formData.get('prompt'); //email
  const name = formData.get('name');

  if (!validateString(prompt, 5000)) {
    return {
      error: 'Invalid prompt',
    };
  }

  if (!validateString(name, 500)) {
    return {
      error: 'Invalid name',
    };
  }

  const userSession = await session;

  if (userSession?.user?.status !== 'Admin') {
    throw new Error("You don't have permission to perform this action");
  }

  let data;
  try {
    data = await prisma.prompt.create({
      data: {
        name: name as string,
        prompt: prompt as string,
        color: color as string,
        user: { connect: { id: userId } },
      }
    })

    revalidatePath('/prompts')
  } catch (error: unknown) {
    console.log(error)
    return {
      error: extractErrorMessage(error),
    };
  }

  return {
    data,
  };
};
  