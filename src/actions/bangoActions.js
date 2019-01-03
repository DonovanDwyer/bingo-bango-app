// let BASEURL = "http://10.39.108.193:4000"
const BASEURL = "https://bingobango-api.herokuapp.com"

export function valueGetter(data) {
  return (dispatch) => {
    return fetch(`${BASEURL}/api/v1/values`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        value: {
          theme: data.theme
        }
      })
    }).then(res => res.json())
      .then(values => dispatch({ type: 'GET_VALUES', payload: values, room: data.room }));
  };
}

export function getAllThemes(data) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return fetch(`${BASEURL}/api/v1/values`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        value: {
          theme: data
        }
      })
    }).then(res => res.json())
      .then(values => dispatch({ type: 'GET_THEMES', payload: values }));
  };
}
