import { callChain } from '@/lib/ai/langchain';
import { LangChainStream, Message } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage } from 'langchain/schema';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
};

export async function POST(req: Request) {
  const { messages, prompt } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

  const question = prompt /* messages[messages.length - 1].content; */

  console.log(question)

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }

  llm
    .call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error);

    const streamingTextResponse = callChain({
      question, // where we pass the question
      chatHistory: formattedPreviousMessages.join("\n"),
    });

    return streamingTextResponse;
}
