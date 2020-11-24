const BASE_URL = process.env.REACT_APP_BASE_URL;

export const signInWithEmail = async (email, password) => {
  try {
    let response = await fetch(`${BASE_URL}/api/auth`, {
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
    console.log(process.env.REACT_APP_BASE_URL);
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const { id, name: username, email: userEmail } = await response.json();

    return response.status === 200
      ? { user: { id, username, email: userEmail } }
      : {};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const signUp = async (username, email, password) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users`, {
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
