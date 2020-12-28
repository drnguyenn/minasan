const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchHobbies = async accessToken => {
  try {
    const response = await fetch(`${BASE_URL}/api/hobbies`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const hobbiesList = await response.json();
    return {
      hobbyList: hobbiesList.map(mes => {
        return { id: mes.id, name: mes.name };
      })
    };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
export const fetchIssues = async accessToken => {
  const response = await fetch(`${BASE_URL}/api/topics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const issuesList = await response.json();
  return {
    issuesList: issuesList.map(mes => {
      return { id: mes.id, name: mes.name };
    })
  };
};

export const updateProfile = async (accessToken, userProfile) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProfile)
    });

    return response.status === 201 ? {} : {};
  } catch (error) {
    console.error(error.response);
    throw new Error(error.message);
  }
};

export const updateAvatar = async (accessToken, userProfile) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: userProfile
    });
    let return_mes = await response.json();
    console.log(return_mes);

    return response.status === 201 ? {} : {};
  } catch (error) {
    console.error(error.response);
    throw new Error(error.message);
  }
};
