const initialState = {
  currentUser: {},
  allUsers: [],
  musings: []
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case 'GET_USER':
      return action.payload
    case 'LOGOUT_USER':
      return {...state, currentUser: {}, musings: []}
    case 'LOAD_USER':
      return {...state, currentUser: action.payload}
    case 'GET_BANDS':
      return {...state, allUsers: [action.payload]}
    case 'GET_MUSINGS':
      return {...state, musings: [action.payload]}
    case 'POST_MUSING':
      return {...state, musings: [...this.state.musings, action.payload]}
    default:
      return state;
  }
}
