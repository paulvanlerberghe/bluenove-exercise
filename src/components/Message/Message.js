import "./Message.css";

const Message = ({message}) => {
  return (
    <div className="message">
      <div className="box">
        <span className="author">{message.author} dit :</span>
        <p>{message.text}</p>
      </div>
      <span className="date">{message.date.toLocaleTimeString("fr", {hour: '2-digit', minute: '2-digit'})}</span>
    </div>
  );
};

export default Message;
