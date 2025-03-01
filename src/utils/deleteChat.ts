import { SubmitFunction } from "react-router-dom";

interface DeleteChatProps {
  chatId: string,
  title: string,
  submit: SubmitFunction,
}

const deleteChat = ({ chatId, title, submit }: DeleteChatProps) => {
  const confirmDelete = confirm(`Are you sure you want to delete the converstation? \n\nResponse and history will be removed.`)
  if (!confirmDelete) return;
  submit(
    {
      request_type: 'delete_chat',
      chat_id: chatId,
      chat_title: title
    },
    {
      method: 'DELETE',
      encType: 'application/x-www-form-urlencoded',
      action: '/'
    }
  )
  console.log('Chat as been wiped')
}

export default deleteChat;

