const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchHobbies = async accessToken => {
  //   const response = await fetch(`${BASE_URL}/api/conversations/${roomId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   });

  //   const { messages } = await response.json();
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
