const initialState = {
  currentUser: {},
  allUsers: [],
  musings: []
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case 'GET_USER':
      return {...state, currentUser: action.payload}
    case 'LOGOUT_USER':
      return {...state, currentUser: {}, musings: []}
    case 'LOAD_USER':
      return {...state, currentUser: action.payload}
    case 'GET_BANDS':
      return {...state, allUsers: [action.payload]}
    case 'GET_MUSINGS':
      return {...state, musings: [action.payload]}
    case 'POST_MUSING':
      return {...state, musings: [[...state.musings[0], action.payload]]}
    case 'DELETE_MUSING':

      let filteredMusings = state.musings[0].filter(musing => {
        return musing.id !== action.payload
      })
      return {...state, musings: [filteredMusings]}
    default:
      return state;
  }
}
