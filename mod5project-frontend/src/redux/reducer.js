const initialState = {
  currentUser: {}
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case 'GET_USER':
      return action.payload
    case 'LOAD_USER':
      return {...state, currentUser: action.payload}
    default:
      return state;
  }
}
