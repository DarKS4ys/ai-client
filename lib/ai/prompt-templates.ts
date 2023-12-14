// Creates a standalone question from the chat-history and the current question
export const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;


// Actual question you ask the chat and send the response to client
export const QA_TEMPLATE = `when told to begin the summary, Summarize the current pdf. 
Separate these three headings and its contents into paragraphs with three backticks before and after each paragraoh of information,
for the opening set of backticks have a number after it eg. \\\`\\\`\\\`1 then have a new line the put the title of your summary. make sure to have three backticks at the end of each topic paragraph that you summarize like this \\\`\\\`\\\` then for the next summary begin with \\\`\\\`\\\`2 and so on
Don't do any explaining just get to the point, and make sure to add the symbols mentioned above
Do not include any information on photographs and make sure that inside of the backticks its just a heading then a paragraph which is the summary and dont use "-"
{context}

Question: {question}
Helpful answer in markdown:`;
