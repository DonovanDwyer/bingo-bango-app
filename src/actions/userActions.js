export function addUser(user) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return fetch("http://localhost:4000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password
        }
      })
    }).then(res => res.json())
      .then(user => dispatch({ type: 'ADD_USER', payload: user }));
  };
}

export function getUser(user) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password
        }
      })
    }).then(res => res.json())
      .then(user => dispatch({ type: 'GET_USER', payload: user }));
  };
}
