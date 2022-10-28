import { useState } from "react";
import { Link } from "react-router-dom";
import { convertTimestampToShortDate } from "../../helpers/convertDate";
import useAuth from "../../hooks/auth.hook";
import "./Chat.scss";

interface ChatMessage {
  avatar: string;
  name: string;
  authorid: number;
  type: "message";
  data: string;
  createdAt: number;
}

export const Chat = ({ ws }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { token } = useAuth();
  const [inputMessage, setInputMessage] = useState("");

  ws.onmessage = (message) => {
    setMessages((messages) => [JSON.parse(message.data), ...messages]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      type: "message",
      data: inputMessage,
      token,
    };
    ws.send(JSON.stringify(message));
    setInputMessage("");
  };

  const handleInput = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className='chat'>
      <div className='messages'>
        {messages.map((message, index) => (
          <div className='message_container' key={index}>
            <div className='avatar'>
              <Link to={`/users/${message.authorid}`}>
                <img src={message.avatar} alt='avatar' />
              </Link>
            </div>
            <div className='message_body'>
              <Link to={`/users/${message.authorid}`}>
                <strong className='name'>{message.name}</strong>
              </Link>
              <p className='text'>{message.data}</p>
              <span className='time'>{convertTimestampToShortDate(message.createdAt)}</span>
            </div>
          </div>
        ))}
        <h6>Добро пожаловать в чат</h6>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' value={inputMessage} onChange={handleInput} placeholder='Сообщение...' />
        <input type='submit' value='Отправить' className='button' />
      </form>
    </div>
  );
};
