const type = {
  NAV: "NAV",
  ACCOUNT: "ACCOUNT",
  COLOR: "COLOR",
  CURSOR: "CURSOR",
  LOGINED: "LOGINED"
};

import { createContext, useReducer } from "react";
import { activeSection } from "../utilits";
const context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case type.NAV:
      return {
        ...state,
        nav: action.payload,
      };
    case type.LOGINED:
      return {
        ...state,
        logined: action.payload.status,
        username: action.payload.username,
      };
    case type.ACCOUNT:
      return {
        ...state,
        wallet: action.payload.wallet,
        // extensionState: action.payload.extensionState,
    };
    case type.COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case type.CURSOR:
      return {
        ...state,
        megicCursor: action.payload,
      };

    default:
      return state;
  }
};

const state = (props) => {
  const initialState = {
    nav: "home",
    color: "#4169e1",
    megicCursor: "show",
    extensionState: false,
    username: "",
    logined: false,
    wallet: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeNav = (value) => {
    dispatch({
      type: type.NAV,
      payload: value,
    });
    // activeSection(value);
  };

  const logStatus = (value) => {
    dispatch({
      type: type.LOGINED,
      payload: value,
    });
  }

  const storeWallet = (value) => {
    dispatch({
      type: type.ACCOUNT,
      payload: value,
    });
  };

  const getMagicCursor = (value) => {
    let cursor = localStorage.getItem("edreaa-megic-cursor");
    dispatch({
      type: type.CURSOR,
      payload: cursor ? cursor : value,
    });
    document
      .querySelector(".edrea_tm_all_wrap")
      .setAttribute("data-magic-cursor", cursor ? cursor : value);
  };

  const changeCursor = (value) => {
    document
      .querySelector(".edrea_tm_all_wrap")
      .setAttribute("data-magic-cursor", value);
    localStorage.setItem("edreaa-megic-cursor", value);
    dispatch({
      type: type.CURSOR,
      payload: value,
    });
  };

  const getColor = (value) => {
    let color = localStorage.getItem("edreaa-color");
    document.documentElement.style.setProperty(
      "--main-color",
      color ? color : value
    );
    dispatch({
      type: type.COLOR,
      payload: color ? color : value,
    });
  };

  const colorChange = (value) => {
    document.documentElement.style.setProperty("--main-color", value);
    localStorage.setItem("edreaa-color", value);
    dispatch({
      type: type.COLOR,
      payload: value,
    });
  };

  return (
    <context.Provider
      value={{
        ...state,
        changeNav: changeNav,
        logStatus: logStatus,
        storeWallet: storeWallet,
        colorChange: colorChange,
        getColor: getColor,
        getMagicCursor: getMagicCursor,
        changeCursor: changeCursor,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default state;

export { context };
