import { Fragment, useContext, useState } from "react";
import { context } from "@/src/hooks/context";

const MobileHeader = () => {
  const [toggle, setToggle] = useState(false);
  const navContext = useContext(context);
  const { nav, changeNav, logined, logStatus, username, account } = navContext;

  const activeNav = (value) => (value == nav ? "active" : "");
  const onClick = (value) => {
    setToggle(false);
    changeNav(value);
  };
  const logout = () => {
    logStatus({username: '', status:false});
    setToggle(false);
    changeNav('home');
  }

  return (
    <Fragment>
      <div className="edrea_tm_topbar">
        <div className="topbar_inner">
          <div className="logo">
            <a href="#">
              <img src="img/logo/iplaymore_1080x454.png" alt="" />
            </a>
          </div>
          <div className="trigger">
            <div
              className={`hamburger hamburger--slider ${
                toggle ? "is-active" : ""
              }`}
            >
              <div className="hamburger-box" onClick={() => setToggle(!toggle)}>
                <div className="hamburger-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`edrea_tm_mobile_menu ${toggle ? "opened" : ""}`}>
        <div className="inner">
          <div className="menu_list">
            <ul className="transition_link">
            {logined?
              <li>
                <label>{account.substr(0, 5)}...{account.substr(-4, 4)}</label>
              </li>:''
              }
              <li className={activeNav("home")}>
                <a href="#home" onClick={() => onClick("home")}>
                  Home
                </a>
              </li>
              <li className={activeNav("videos")}>
                <a href="#videos" onClick={() => onClick("portfolio")}>
                Videos 
                </a>
              </li>
              <li className={activeNav("bonfire")}>
                <a href="#bonfire" onClick={() => onClick("bonfire")}>
                Bonfire Stories
                </a>
              </li>
              {/* <li className={activeNav("login")}>
                <a href="#login" onClick={() => onClick("login")}>
                Login
                </a>
              </li> */}
              {/* <li className={activeNav("portfolio")}>
                <a href="#portfolio" onClick={() => onClick("portfolio")}>
                  Portfolio
                </a>
              </li>
              <li className={activeNav("news")}>
                <a href="#news" onClick={() => onClick("news")}>
                  News
                </a>
              </li> */}
              {/* <li className={activeNav("register")}>
                <a href="#register" onClick={() => onClick("register")}>
                  Register
                </a>
              </li> */}
              {logined?
              <li >
                <a class="logout" onClick={() => logout()}>
                  Logout 
                </a>
              </li>:
              <li className={activeNav("signin")}>
                <a href="#login" onClick={() => onClick("signin")}>
                  Sign In 
                </a>
              </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default MobileHeader;
