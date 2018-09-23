import { IMG_SEARCH } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case IMG_SEARCH:
      return action.payload;
    default:
      return state;
  }
}
