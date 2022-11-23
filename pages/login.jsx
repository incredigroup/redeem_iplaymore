import { Fragment, useContext, useState } from "react";
import { context } from "@/src/hooks/context";
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link'
import Web3 from "web3";

const Register = ( { route } ) => {
    const navContext = useContext(context);
    const {changeNav, logStatus, account, extensionState} = navContext;
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    // const [errorMessage, setMessage] = useState('');
    const [checkType, setType] = useState('email');
    const [popup, setPopup] = useState(false);
    const [loginData, setLoginData] = useState({email: "", password:""});
    const [error, setError] = useState({flag: "", message: ""});

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

    async function onSubmit(e) {
        e.preventDefault();
        if (loginData.email.length === 0 || loginData.password.length === 0) {
            setError({...error, flag: true, message:"Please Fill Required Fields"});
        } else {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            const data = await res.json();
            if (res.status === 200) {
                setError({...error, flag: false, message:"Incorrect Login details, Email or Password is wrong"});
                setLoginData({ email: "", password: ""});
            } else if(res.status === 201) {
                setError({...error, flag: true, message:data.message});
            } else {
                // console.log(err.text); 
            }
        }
        clearError();
    }

    const clearError = () => {
        setTimeout(() => {
          setError({...error, flag: "", message:""});
        }, 3000);
    };

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
                    {error.flag? 
                    <div className="m-bg-color rounded-md px-2 py-2 relative mb-5 ">
                        <p className="error-message">{error.message}</p>
                        <span><ErrorIcon className="error-icon"/></span>
                    </div>:''}
                    <form action="" className="space-y-2.5" id="contact_form"  onSubmit={(e) => onSubmit(e)}>
                    <div className="m-bg-color">
                        <div className="relative ">
                            <input type="email" name="email" className="form-input peer" placeholder=" " onChange={(e) => setLoginData({...loginData, [e.target.name]: e.target.value})} value={loginData.email}/>
                            <label htmlFor="firstname" className="chasing-text">Username / Email Address</label>
                        </div>
                    </div>
                    <div className="m-bg-color rounded-md px-2 py-1">
                        <div className="relative ">
                            <input type="password" name="password"  className="form-input peer" placeholder=" " onChange={(e) => setLoginData({...loginData, [e.target.name]: e.target.value})} value={loginData.password}/> 
                            <span><VisibilityIcon className="text-[#7a7773] absolute top-4 left-[95%]"/></span>
                            <label htmlFor="password" className="chasing-text">Password</label>
                        </div>
                    </div>
                    <div>
                        <Link href="/auth/forgot">
                            <p className="pt-1 mb-3 text-[14px] text-sun font-medium hover:cursor-pointer" onClick={()=>changeNav('forgot')}>Forgot password?</p>
                        </Link>
                        <button className="auth-button" type="submit">Login</button>
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
        </Fragment>
    );
};
export default Register;
