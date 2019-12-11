import { SET_PERMISSION, GET_PERMISSION, SET_INTERNAL_USER } from "../actionTypes";

const initialState = {
  permission: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PERMISSION: {
      const { permission } = action.payload;
      console.log(`permission`)
      console.log(permission)
      console.log(action.payload)
      return {
        ...state,
        permission: permission
      };
    }
    case SET_INTERNAL_USER: {
      const { username } = action.payload;
      console.log(`SET_INTERNAL_USER`)
      console.log(username)
      console.log(action.payload)
      return {
        ...state,
        username: username
      };
    }
    default:
      return state;
  }
}
