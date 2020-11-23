export const fetchChatContent = async chatId => {
  // console.log('hello')
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
    // console.log(accessToken)
    const response = await fetch(`/api/conversations`, {
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

export const fetchRandom = async (accessToken) =>{
  try {
    console.log('fetchRandom')
    // console.log(accessToken)
    const response = await fetch(`/api/users/random`, {
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

export const createConversation = async (accessToken,curr_id, aite_id) =>{
  try {
    console.log('create conversation')
    // console.log(accessToken)
    const response = await fetch(`/api/conversations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user1Id: curr_id, user2Id: aite_id })
    });
    if (response.status === 200) {
      let re = await response.json()
      return {re}
    }
    // if (response.status === 400) {
    //   console.error('Bad Request')
    //   console.log(response.meta)
    // }
    return {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}