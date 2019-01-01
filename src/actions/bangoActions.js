export function valueGetter(data) {
  return (dispatch) => {
    return fetch("http://localhost:4000/api/v1/values", {
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
