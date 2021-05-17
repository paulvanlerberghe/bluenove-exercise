import "./MessageList.css";
import Message from "../Message/Message";

const MessageList = ({messages}) => {

  return (
    <div className="message-list">
      {messages.map((message, index) => <Message message={message} key={index} />)}
    </div>
  );
};

export default MessageList;
