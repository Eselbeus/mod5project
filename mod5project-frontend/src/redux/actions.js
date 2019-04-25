const loadUser = (user) => ({type: "LOAD_USER", payload: user})


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
