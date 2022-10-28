import { Chat } from "../../components/Chat/Chat";

export const ChatPage = () => {
  const wsURL = `ws://${window.location.host}/ws/chat`;
  const ws = new WebSocket(wsURL);
  return (
    <div className='chat_page'>
      <Chat ws={ws} />
    </div>
  );
};
