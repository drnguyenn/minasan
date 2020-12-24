const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchHobbies = async accessToken => {
  try {
    console.log('here');
    const response = await fetch(`${BASE_URL}/api/hobbies`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const messages = await response.json();
    console.log(messages);
    return {
      hobbyList: [
        'gaming',
        'liturature',
        'puzzle',
        'movie',
        'art',
        'photograph',
        'literature'
      ]
    };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
export const fetchIssues = async accessToken => {
  //   const response = await fetch(`${BASE_URL}/api/conversations/${roomId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   });

  //   const { messages } = await response.json();
  return {
    issuesList: [
      'friend',
      'family',
      'work',
      'love',
      'passion',
      'anger_management'
    ]
  };
};

export const fetchProfile = async accessToken => {
  //   const response = await fetch(`${BASE_URL}/api/conversations/${roomId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   });

  //   const { messages } = await response.json();
  return {
    userProfile: {}
  };
};

export const updateProfile = async (accessToken, userProfile) => {
  //   const response = await fetch(`${BASE_URL}/api/conversations/${roomId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   });

  //   const { messages } = await response.json();
  return {};
};
