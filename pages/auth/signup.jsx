import { Fragment, useContext, useState } from "react";
import { context } from "@/src/hooks/context";
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
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
    <Fragment >
        <div className="flex md:flex-row" >
            <div className="flex-[0.5] md:flex-[0.5]">
                <h1 className="h1-text-responsive">GAIN EARLY ACCESS</h1>
                <p className="descri-text">Welcome, pick a username before anyone else, acquire gears and devices <br className="hidden xl:block"/>early and get ready to play!
                </p>
            </div>
            <div className="flex-[0.4] md:flex-[0.4] pt-12 ">
                <form action="" className="space-y-2.5">
                    <div className="m-bg-color">
                        <div class="relative ">
                            <input type="text" id="username"  class="form-input peer " placeholder=" " /> 
                            <span><ErrorIcon className="text-red-900 absolute top-4 left-[95%]"/></span>
                            <label htmlFor="username" class="chasing-text">Username</label>
                        </div>
                        <p class="filled-success-help">Username already exists</p>
                    </div>
                    <div className="m-bg-color">
                        <div class="relative ">
                            <input type="email" id="email"  class="form-input peer " placeholder=" " /> 
                            <span><ErrorIcon className="text-red-900 absolute top-4 left-[95%]"/></span>
                            <label htmlFor="email" class="chasing-text">Email</label>
                        </div>
                        <p class="filled-success-help">Invalid Email Format</p>
                    </div>
                    <div className="m-bg-color">
                        <div class="relative ">
                            <input type="text" id="metamask"  class="form-input peer" placeholder=" " /> 
                            <span><ErrorIcon className="text-red-900 absolute top-4 left-[95%]"/></span>
                            <label htmlFor="metamask" class="chasing-text">MetaMask Address</label>
                        </div>
                        <p class="filled-success-help">Not Connection with MetaMask</p>
                    </div>
                    <div className="m-bg-color">
                        <div class="relative ">
                            <input type="password" id="password"  class="form-input peer " placeholder=" " /> 
                            <span><VisibilityIcon className="text-[#7a7773] absolute top-4 left-[95%]"/><ErrorIcon className="text-red-900 absolute top-4 left-[84%] xs:left-[87%] md:left-[86%]"/></span>
                            <label htmlFor="password" class="chasing-text">Password</label>
                        </div>
                        <p class="filled-success-help">Invalid Password Format</p>
                    </div>
                    <div className="m-bg-color">
                        <div class="relative ">
                            <input type="password" id="confirm_password"  class="form-input peer " placeholder=" " /> 
                            <span><VisibilityOffIcon className="text-[#7a7773] absolute top-4 left-[95%]"/><ErrorIcon className="text-red-900 absolute top-4 left-[84%] xs:left-[87%]  md:left-[86%]"/></span>
                            <label htmlFor="confirm_password" class="chasing-text">Confirm Password</label>
                        </div>
                        <p class="filled-success-help">Password does not match</p>
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
    </Fragment>
    );
};
export default Register;
