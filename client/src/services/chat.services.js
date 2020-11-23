export const fetchChatContent = async chatId => {
  // console.log('hello')
  return {
    chat: {
      title: chatId
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

    console.log(res)

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
    const res = await response.json()

    console.log(res)

  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}