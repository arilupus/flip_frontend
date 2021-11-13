import ActionType from './globalActionType';

const globalState = {
  data: [],
}

// reducer
const rootReducer = (state = globalState, action) => {
  switch(action.type) {
    case ActionType.GET_DETAIL:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;