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
                    <h1 className="h1-text-responsive tracking-wide font-extrabold pt-10">Forgot Password</h1>
                    <p className="descri-text">Enter your email to reset your password
                    </p>
                </div>
                <div className="flex-[0.4] md:flex-[0.4] pt-10 ">
                    <form action="" className="space-y-2.5">
                        <div className="m-bg-color">
                            <div className="relative">
                                <input type="text" id="email"  className="form-input peer " placeholder=" " />
                                <label htmlFor="email" className="chasing-text">Email</label>
                            </div>
                        </div>
                        <div>
                            <button className="auth-button">Reset</button>
                            <p className="redi-text">Remember your password? &nbsp;
                                <span className="text-sun" onClick={()=>changeNav('login')}>
                                    <Link href="/login">
                                        Login 
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
