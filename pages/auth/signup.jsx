import { Fragment, useContext, useState, useEffect, useRef } from "react";
import { context } from "@/src/hooks/context";
// import { getCurrentUser } from "@/src/hooks/index";
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { TurnedIn } from "@mui/icons-material";

const Register = ( {route } ) => {
    const navContext = useContext(context);
    // const [user, {mutate}] = getCurrenctUser();
    const userRef = useRef();
    const emailRef = useRef();
    const walletRef = useRef();
    const passwordRef = useRef();
    const repasswordRef = useRef();
    const {wallet, storeWallet} = navContext;
    const [error, setError] = useState({flag: "", message: ""});

    // useEffect(() => {
    //     if(user) Router.replace('/');
    // },[]);

    useEffect(() => {
        connectMetaMask();
    }, [])

    const connectMetaMask = () => {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          var signer = provider.getSigner();
          window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
        } else {
          storeWallet({wallet: ''})
        }
    };

    const accountChangeHandler = (walletAddress) => {
        walletRef.current.value = walletAddress;
        // storeWallet({wallet: walletAddress});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(passwordRef.current.value !== repasswordRef.current.value) {
            setError({...error, flag: true, message: "Passwords do not match!"});
            return;
        } else {
            const formData = new FormData();
            formData.append('name', userRef.current.value);
            formData.append('email', emailRef.current.value);
            formData.append('wallet', walletRef.current.value);
            formData.append('password', passwordRef.current.value);
            const res = await res('/api/auth', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            if (res.status === 201) {
                // setLoading(false);
                // setSuccess(true);
                await delay(6000);
                alert("aa");
          
                const userObj = await res.json();
                // mutate(userObj);
                // setSuccess(false);
            } else {
                setError({...error, flag: true, message: await res.text()})
                // setLoading(false);
            }
        }
    }

    return (
    <Fragment >
        <Head>iPlayMore | Signup</Head>
        <div className="flex md:flex-row" >
            <div className="flex-[0.5] md:flex-[0.5]">
                <h1 className="h1-text-responsive">GAIN EARLY ACCESS</h1>
                <p className="descri-text">Welcome, pick a username before anyone else, acquire gears and devices <br className="hidden xl:block"/>early and get ready to play!
                </p>
            </div>
            <div className="flex-[0.4] md:flex-[0.4] pt-12 ">
                {error.flag? 
                    <div className="m-bg-color rounded-md px-2 py-2 relative mb-5 ">
                        <p className="error-message">{error.message}</p>
                        <span><ErrorIcon className="error-icon"/></span>
                    </div>:''
                }
                <form action="" className="space-y-2.5">
                    <div className="m-bg-color">
                        <div className="relative ">
                            <input 
                                type="text" 
                                id="username"
                                className="form-input peer "
                                placeholder=" "
                                ref={userRef}
                            /> 
                            <span><ErrorIcon className="text-red-900 absolute top-4 left-[95%]"/></span>
                            <label htmlFor="username" className="chasing-text">Username</label>
                        </div>
                        <p className="filled-success-help">Username already exists</p>
                    </div>
                    <div className="m-bg-color">
                        <div className="relative ">
                            <input 
                                type="email" 
                                id="email"  
                                className="form-input peer " 
                                placeholder=" " 
                                ref={emailRef}    
                            /> 
                            <span><ErrorIcon className="text-red-900 absolute top-4 left-[95%]"/></span>
                            <label htmlFor="email" className="chasing-text">Email</label>
                        </div>
                        <p className="filled-success-help">Invalid Email Format</p>
                    </div>
                    <div className="m-bg-color">
                        <div className="relative ">
                            <input 
                                type="text" 
                                id="metamask"
                                className="form-input peer"
                                placeholder=" "
                                ref={walletRef}    
                            /> 
                            <span><ErrorIcon className="text-red-900 absolute top-4 left-[95%]"/></span>
                            <label htmlFor="metamask" className="chasing-text">MetaMask Address</label>
                        </div>
                        <p className="filled-success-help">Not Connection with MetaMask</p>
                    </div>
                    <div className="m-bg-color">
                        <div className="relative ">
                            <input 
                                type="password"
                                id="password" 
                                className="form-input peer " 
                                placeholder=" "
                                ref={passwordRef}    
                            /> 
                            <span><VisibilityIcon className="text-[#7a7773] absolute top-4 left-[95%]"/><ErrorIcon className="text-red-900 absolute top-4 left-[84%] xs:left-[87%] md:left-[86%]"/></span>
                            <label htmlFor="password" className="chasing-text">Password</label>
                        </div>
                        <p className="filled-success-help">Invalid Password Format</p>
                    </div>
                    <div className="m-bg-color">
                        <div className="relative ">
                            <input 
                                type="password"
                                id="confirm_password"
                                className="form-input peer " 
                                placeholder=" " 
                                ref={repasswordRef}    
                            /> 
                            <span><VisibilityOffIcon className="text-[#7a7773] absolute top-4 left-[95%]"/><ErrorIcon className="text-red-900 absolute top-4 left-[84%] xs:left-[87%]  md:left-[86%]"/></span>
                            <label htmlFor="confirm_password" className="chasing-text">Confirm Password</label>
                        </div>
                        <p className="filled-success-help">Password does not match</p>
                    </div>
                    <div>
                        <p className="hidden md:block md:text-sm pt-2 pb-3 lg:text-[12px] text-[#53504d] font-medium ">By registering, you agree to our <span className="text-sun">Terms of Use</span> and <span  className="text-sun">Privacy Policy</span></p>
                        <button className="auth-button">
                            Register
                        </button>
                        <p className="redi-text">Already have an account? &nbsp;<span className="text-sun"><Link href="/login"> Login</Link></span></p>
                    </div>
                </form>
                
            </div>
        </div>
        {/* <Loading status={loading} /> */}
        {/* <Success status={success} /> */}
    </Fragment>
    );
};


function Loading({ status }) {
    if (!status) return <></>;
    
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center"><i className="text-6xl fa fa-spin fa-spinner"></i></div>
        <div className="fixed inset-0 z-40 bg-black opacity-40"></div>
      </>
    )
  }
  
  function Success({ status }) {
    if (!status) return <></>;
    
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="">
            <div className="flex justify-center animate-bounce">
              <img src="esportsref-logo-v3.png" width={135} alt="logo" />
            </div>
            <h2 className="mt-5 mb-4 text-3xl font-semibold text-center">Sign up Success !</h2>
            <p className="text-xl text-center">Thanks, your information will be reviewed by a member of our team, and you will be approved shortly.</p>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-90"></div>
      </>
    )
  }

export default Register;
