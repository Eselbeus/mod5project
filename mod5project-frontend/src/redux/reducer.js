const initialState = {
  currentUser: {},
  allUsers: []
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case 'GET_USER':
      return action.payload
    case 'LOGOUT_USER':
      return {...state, currentUser: {}}
    case 'LOAD_USER':
      return {...state, currentUser: action.payload}
    case 'GET_BANDS':
      return {...state, allUsers: [action.payload]}
    default:
      return state;
  }
}
