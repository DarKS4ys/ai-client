// Creates a standalone question from the chat-history and the current question
export const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;


// Actual question you ask the chat and send the response to client
export const QA_TEMPLATE = `when told to begin the summary
summarise this document into 500 words and have multiple paragraphs

Document: {context}

Question: {question}
Helpful answer in markdown:`;
