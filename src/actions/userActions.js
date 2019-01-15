// let BASEURL = "http://localhost:4000"
const BASEURL = "https://bingobango-api.herokuapp.com"

export function addUser(user) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return fetch(`${BASEURL}/api/v1/users`, {
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
    return fetch(`${BASEURL}/api/v1/login`, {
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


export function increaseWins(user) {
  return (dispatch) => {
    return fetch(`${BASEURL}/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          wins: user.wins + 1,
          losses: user.losses
        }
      })
    }).then(res => res.json())
      .then(user => dispatch({type: 'INCREASE_WINS'}))
  }
}

export function increaseLosses(user) {
  return (dispatch) => {
    return fetch(`${BASEURL}/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          losses: user.losses + 1,
          wins: user.wins
        }
      })
    }).then(res => res.json())
      .then(user => dispatch({type: 'INCREASE_LOSSES'}))
  }
}

export function logUserOut() {
  return { type: 'LOG-OUT' }
}

export function checkAuth(token){
  return (dispatch) => {
    return fetch(`${BASEURL}/api/v1/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  }
}

export function getUserViaToken(token) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return fetch(`${BASEURL}/api/v1/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
      .then(user => dispatch({ type: 'GET_USER_BY_TOKEN', payload: user }));
  };
}
