import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";

// ACTION
const action = () => {
  return {
    type: "TYPE",
  };
};

// REDUCER
const reducer = (state = 0, action) => {
  switch (action.type) {
    case "TYPE":
      return state + 1;
    default:
      return state;
  }
};

// STORE
const store = createStore(reducer);

// DISPATCH
const dispatch = useDispatch();
dispatch(action());

// Display store
const state = useSelector(state => state);
{state}

