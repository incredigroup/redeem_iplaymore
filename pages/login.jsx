import { Fragment, useContext, useState } from "react";
import { context } from "@/src/hooks/context";
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link'
import Web3 from "web3";

const Register = ( {route } ) => {
    const navContext = useContext(context);
    const {changeNav, logStatus, account, extensionState} = navContext;
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    const [errorMessage, setMessage] = useState('');
    const [checkType, setType] = useState('email');
    const [popup, setPopup] = useState(false);

    const loginWithWallet = () =>  {
        // if(!extensionState) {
        //     alert("Please Install MetaMask Extension");
        //     return;
        // }
        if(!account ) {
            alert("Please Connect with MetaMask");
            return;
        }
        setType('wallet');
        checkUser(account);
    }

    async function checkUser(value) {
        const res = await fetch('/api/user?value=' + value);
        if (res.status === 200) {
            const data = await res.json();
            const {name, email, wallet} = data.user;
            // create loggined user session, we have to create middleware for managing signined user. 
            logStatus({username: name, status: true});
            changeNav("home");
            setPopup(false);
            setMessage('');
            // web3.eth.personal.sign("web3.fromUtf8(name)", web3.eth.coinbase, console.log);
        } else {
            const data = await res.json();
            // if(setType == 'email') {
                // setMessage(data.message);
            // } else {
                alert(data.message);
            // }
        }
    }

    return (
        <Fragment>
            <div className="flex md:flex-row" >
                {/* width css issues */}
                <div className="flex-[0.5] md:flex-[0.5] ">
                    <h1 className="h1-text-responsive">WELCOME BACK</h1>
                    <p className="descri-text">Get in, aquire more gears and devices, redeem codes and get ready to play!
                    </p>
                </div>
                <div className="flex-[0.4] md:flex-[0.4] pt-10 ">
                    <div className="m-bg-color rounded-md px-2 py-2 relative mb-5 ">
                        <p className="error-message">Incorrect Login details, Email or Password is wrong</p>
                        <span><ErrorIcon className="error-icon"/></span>
                    </div>
                    <form action="" className="space-y-2.5">
                    <div className="m-bg-color">
                        <div className="relative ">
                            <input type="text" id="firstname"  className="form-input peer" placeholder=" " />
                            <label htmlFor="firstname" className="chasing-text">Username / Email Address</label>
                        </div>
                    </div>
                    <div className="m-bg-color rounded-md px-2 py-1">
                        <div className="relative ">
                            <input type="password" id="password"  className="form-input peer" placeholder=" " /> 
                            <span><VisibilityIcon className="text-[#7a7773] absolute top-4 left-[95%]"/></span>
                            <label htmlFor="password" className="chasing-text">Password</label>
                        </div>
                    </div>
                    <div>
                        <Link href="/auth/forgot">
                            <p className="pt-1 mb-3 text-[14px] text-sun font-medium hover:cursor-pointer" onClick={()=>changeNav('forgot')}>Forgot password?</p>
                        </Link>
                        <button className="auth-button">Login</button>
                        <p className="redi-text">If you do not have an existing account &nbsp;
                            <span className="text-sun" onClick={()=>changeNav('signup')}>
                                <Link href="/auth/signup">
                                    Sign Up
                                </Link>
                            </span>
                        </p>
                    </div>
                    </form>
                </div>
            </div>

            {/* <div className="edrea_tm_section hidden animated" id="signin">
                <div className="section_inner">
                    <div className="edrea_tm_button button-group"> 
                        <div className="button">
                            <label className="alink" style={{width:'50%', marginTop: '20px'}} onClick={() => loginWithWallet()}>Continue with MetaMask</label>
                        </div>
                        <div className="button">
                            <label className="alink" style={{width:'50%', marginTop: '20px'}} onClick={() => setPopup(true)}>Continue with Email</label>
                        </div>
                        <div className="button">
                            <label className="f-16" onClick={() => changeNav("register")}>Dont Have An Account? Create One Free</label>
                        </div>
                    </div>                
                </div>
            </div> */}
        </Fragment>
    );
};
export default Register;
