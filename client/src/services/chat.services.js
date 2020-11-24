const BASE_URL = process.env.REACT_APP_BASE_URL;

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

export const fetchConversations = async (accessToken) =>{
  try {
    console.log('fetchConversations')
    const response = await fetch(`${BASE_URL}/api/conversations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const res = await response.json()

    return response.status === 200
      ? { chat_list :res }
      : {};
      
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export const FetchSuggestedUsers = async (accessToken) =>{
  try {
    console.log('fetchSuggestedUsers')
    const response = await fetch(`${BASE_URL}/api/users/random`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const userlist = await response.json();
    return response.status === 200
      ? { user_list :userlist }
      : {};

  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export const createConversation = async (accessToken, partnerId) =>{
  try {
    console.log('create conversation')
    const response = await fetch(`${BASE_URL}/api/conversations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: partnerId })
    });
    
    if (response.status === 200) {
      let re = await response.json()
      return {re}
    }

    return {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}