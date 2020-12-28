const BASE_URL = process.env.REACT_APP_BASE_URL;

export const signInWithEmail = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    switch (response.status) {
      case 201:
        const { accessToken } = await response.json();
        localStorage.setItem('accessToken', accessToken);

        return await getCurrentUser(accessToken);

      case 401:
        alert('Email or Password is incorrect.');
        throw new Error(response.statusText);

      default:
        return {};
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getCurrentUser = async accessToken => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const {
      id,
      name: username,
      email,
      hobbies,
      topics: issues,
      avatarUrl
    } = await response.json();

    return response.status === 200
      ? {
          user: {
            id,
            username,
            email,
            hobbies,
            issues,
            avatarUrl
          }
        }
      : {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const signUp = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: username, email, password })
    });

    const {
      id,
      name: newUsername,
      email: newUserEmail
    } = await response.json();

    return response.status === 201
      ? { user: { id, username: newUsername, email: newUserEmail } }
      : {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

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
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProfile)
    });

    const user = await response.json();

    const { name, avatarUrl, hobbies, topics } = user;

    return response.status === 200
      ? { user: { username: name, avatarUrl, hobbies, topics } }
      : {};
  } catch (error) {
    console.error(error.response);
    throw new Error(error.message);
  }
};

export const updateAvatar = async (accessToken, avatar) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: avatar
    });

    const user = await response.json();

    const { name, avatarUrl, hobbies, topics } = user;

    return response.status === 200
      ? { user: { username: name, avatarUrl, hobbies, topics } }
      : {};
  } catch (error) {
    console.error(error.response);
    throw new Error(error.message);
  }
};
