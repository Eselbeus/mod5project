export const loadUser = (user) => ({type: "LOAD_USER", payload: user})
export const fillBands = (bands) => ({type: "GET_BANDS", payload: bands})

// const getUser = (user) => ({type: "GET_USER", payload: user})
export const logoutUser = ({}) => {
  localStorage.clear()
  return ({type: "LOGOUT_USER", payload: {}})
}

export const getCurrentUser = (user) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer'
      },
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        email: user.email,
        is_band: user.is_band,
        password: user.password
      })
    })
    .then(res => res.json())
    .then(res => {

      localStorage.setItem('token', res.jwt)
      dispatch(loadUser(res))})
  }
}

export const getUser = (user) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')},
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.jwt)
      dispatch(loadUser(res))})
  }
}

export const getBands = () => {
  console.log("b4 band fetch")
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/users/`)
    .then(res => res.json())
    .then(bands => dispatch(fillBands(bands)))
  }
}
