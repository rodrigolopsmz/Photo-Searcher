const initialState = {
    keyText: '',
    photoResponse: {},
    panel: 'empty',
    pagination: {}

};



const all = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_SEARCH':
        return {...state, 
            keyText: action.payload}; 
    case 'SET_PAGINATION':
        return {...state, 
            pagination: action.payload};
    case 'SET_PHOTO_RESPONSE':
        return {...state, 
            photoResponse: action.payload};  
    case 'SET_PANEL':
        return {...state, 
            panel: action.payload}; 
    default:
      return state;

  }
}

export default all;