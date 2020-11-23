export const fetchChatContent = async chatId => {
  return {
    chat: {
      title: chatId,
      messages: [
        {
          id: 1,
          sender: 'test.user',
          content: 'Hi there'
        },
        {
          id: 2,
          sender: 'long',
          content: "What 's uppp"
        }
      ]
    }
  };
};
