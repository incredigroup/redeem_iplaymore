import { useContext, useEffect } from "react";
import { context } from "@/src/hooks/context";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Header = ( {route} ) => {
  const navContext = useContext(context);
  const router = useRouter()
  const { nav, changeNav, logined, logStatus, username, account } = navContext;


  useEffect(() => {
    console.log("nav = ", nav);
  }, [nav]);



  const activeNav = (value) => (value == nav ? "active" : "");
  const logout = () => {
    logStatus({username: '', status:false});
    changeNav('home');
  }
  return (
    <div className="edrea_tm_header">
      <div className="header_inner">
        <div className="logo md:fill">
          <Link href="/home">
            <Image src="/img/logo/iplaymorelogo.png" height={100} width={400}  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
          </Link>
        </div>
        <div className="menu">
          <ul className="transition_link ">
            <li className={activeNav("home")}>
              <Link href="/home">
                <label onClick={() => changeNav('home')}>Home</label>
              </Link>
            </li>
            <li className={activeNav("videos")} >
              <Link href="/videos" >
                <label onClick={() => changeNav('videos')}>Videos</label>
              </Link>
            </li>
            <li className={activeNav("marketplace")}>
              <Link href="/marketplace">
                <label onClick={() => changeNav('marketplace')}>MarketPlace</label>
              </Link>
            </li>
            <li className={activeNav("redeemcode")}>
              <Link href="/redeemcode">
                <label onClick={() => changeNav('redeemcode')}>Redeem code</label>
              </Link>
            </li>
            <li className={activeNav("game")}>
              <Link href="/game">
                <label onClick={() => changeNav('game')}>Game</label>
              </Link>
            </li>
            <li className={activeNav("login")}>
              <Link href="/login">
                <label onClick={() => changeNav('login')}>Login</label>
              </Link>
            </li>
            {/* {logined?
            <li class="dropbox">
              <div class="dropdown">
                <a href="#">
                  My Account
                </a>
                <div class="dropdown-content" onClick={() => logout()}>
                  <label>{account.substr(0, 5)}...{account.substr(-4, 4)}</label>
                  <br/>
                  <a class="logout" >
                    Logout 
                  </a>
                </div>
              </div>
            </li>:
            <li className='`{activeNav("signin")}` dropbox'>
              <a onClick={() => router.push('/login')} >
               Sign In 
              </a>
            </li>
            } */}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
