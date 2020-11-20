import React, {useEffect, useRef} from 'react';
import { UserSent,FriendSent } from './chat-view.styles';



const Messages = ({ messages }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
  
    return (
      <div className="messagesWrapper">
        {messages.map(message => (
          <span key={message}>{message}</span>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };
  

const ChatView = ({messages}) =>{
    const usersent = ['This is your messages'];
    const friendsent = ['This is messages from your friend'];
return(

    <div className = "chatview">
        <UserSent>
        <Messages messages={usersent} />
        </UserSent>
        <FriendSent>
        <Messages messages={friendsent} />
        </FriendSent>
        {
            messages.map(message => (
                message.isSender 
                ? <UserSent>
                <Messages messages={[message.text]} />
                </UserSent>
                : <FriendSent>
                <Messages messages={[message.text]} />
                </FriendSent>
            ))
        }
    </div>
);
};

export default ChatView;

