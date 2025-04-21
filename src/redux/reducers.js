const initialState = {
    imageData: null,
    scale: 1,
    position: { left: 0, top: 0 },
  };
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_IMAGE_DATA':
        return {
          ...state,
          imageData: action.payload,
        };
      case 'SET_IMAGE_SCALE':
        return {
          ...state,
          scale: action.payload,
        };
      case 'SET_IMAGE_POSITION':
        return {
          ...state,
          position: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default imageReducer;
  