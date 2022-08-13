export const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_POINT":
      return {
        ...state,
        point: state.point + action.payload,
      };
    default:
      return state;
  }
};