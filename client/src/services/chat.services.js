const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchChatContent = async (accessToken, receiverId, roomId) => {
  console.log('fetchChatContent service was called');
  const response = await fetch(`${BASE_URL}/api/conversations/${roomId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const { messages, user1, user2 } = await response.json();
  const currentPartner = user1.id === receiverId ? user1 : user2;
  return {
    chat: {
      receiverId: receiverId,
      roomId: roomId,
      messages: messages.map(({ message, senderId, ...props }) => {
        return { message, senderId };
      })
    },
    currentPartner
  };
};

export const fetchConversations = async accessToken => {
  try {
    console.log('fetchConversations');
    const response = await fetch(`${BASE_URL}/api/conversations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const res = await response.json();

    return response.status === 200 ? { chat_list: res } : {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const FetchSuggestedUsers = async accessToken => {
  try {
    console.log('fetchSuggestedUsers');
    const response = await fetch(`${BASE_URL}/api/users/random`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const userlist = await response.json();
    return response.status === 200 ? { user_list: userlist } : {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const createConversation = async (accessToken, partnerId) => {
  try {
    console.log('create conversation');
    const response = await fetch(`${BASE_URL}/api/conversations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: partnerId })
    });

    if (response.status === 200) {
      let re = await response.json();
      console.log(re);
      return { re };
    }

    return {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
