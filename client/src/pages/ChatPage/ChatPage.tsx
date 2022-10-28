import { Chat } from "../../components/Chat/Chat";

export const ChatPage = () => {
  const ws = new WebSocket("ws://localhost:5000");
  return (
    <div className='chat_page'>
      <Chat ws={ws} />
    </div>
  );
};
