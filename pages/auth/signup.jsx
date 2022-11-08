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
    <Fragment >
        <div className="flex md:flex-row" >
            <div className="flex-[0.4] md:flex-[0.4]">
                <h1 className="text-2xl xs:text-4xl md:text-2xl lg:text-3xl text-sun tracking-wide font-extrabold pt-12 ">GAIN EARLY ACCESS</h1>
                <p className="text-slate-200 text-xs xs:text-lg md:text-sm ">Welcome, pick a username before anyone else,
                    acquire gears and devices <br className="hidden xl:block"/>early and get ready to play!
                </p>
            </div>
            <div className="flex-[0.5] md:flex-[0.5] pt-12 ">
                <form action="" className="space-y-2.5">
                {/* <div className="bg-[#191817] active:border-flame rounded-md px-2 py-1">
                    <div class="relative ">
                        <input type="text" id="firstname"  class="px-2.5 pb-2.5 pt-5 w-full text-sm  bg-transparent focus:outline-none text-[#b3aea9] peer " placeholder=" " />
                        <label htmlFor="firstname" class="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773]   peer-focus:border-0">First Name</label>
                    </div>
                </div>
                <div className="bg-[#191817] rounded-md px-2 py-1">
                    <div class="relative ">
                        <input type="text" id="lastname"  class="px-2.5 pb-2.5 pt-5 w-full text-sm  bg-transparent focus:outline-none text-[#b3aea9] peer " placeholder=" " />
                        <label htmlFor="lastname" class="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773]   peer-focus:border-0 ">Last Name</label>
                    </div>
                </div> */}
                <div className="bg-[#191817] rounded-md px-2 py-1">
                    <div class="relative ">
                        <input type="email" id="email"  class="px-2.5 pb-1 pt-5 w-full text-sm  bg-transparent focus:outline-none text-[#b3aea9] peer " placeholder=" " /> 
                        <span><ErrorIcon className="text-red-900 absolute top-4 left-[90%]"/></span>

                        <label htmlFor="email" class="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773] peer-focus:border-0">Email</label>
                    </div>
                    <p id="filled_success_help" class="mt-0 pl-2 text-xs  text-red-900 ">Invalid Email Format</p>
                </div>
                <div className="bg-[#191817] rounded-md px-2 py-1">
                    <div class="relative ">
                        <input type="text" id="username"  class="px-2.5 pb-1 pt-5 w-full text-sm  bg-transparent focus:outline-none text-[#b3aea9] peer " placeholder=" " /> 
                        <span><ErrorIcon className="text-red-900 absolute top-4 left-[90%]"/></span>

                        <label htmlFor="username" class="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773] peer-focus:border-0">Username</label>
                    </div>
                    <p id="filled_success_help" class="mt-0 pl-2 text-xs  text-red-900 ">Username already exists</p>
                </div>
                <div className="bg-[#191817] rounded-md px-2 py-1">
                    <div class="relative ">
                        <input type="password" id="password"  class="px-2.5 pb-1 pt-5 w-full text-sm  bg-transparent focus:outline-none text-[#b3aea9] peer " placeholder=" " /> 
                        <span><VisibilityIcon className="text-[#7a7773] absolute top-4 left-[90%]"/><ErrorIcon className="text-red-900 absolute top-4 left-[79%] xs:left-[82%] md:left-[81%]"/></span>

                        <label htmlFor="password" class="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773] peer-focus:border-0">Password</label>
                    </div>
                    <p id="filled_success_help" class="mt-0 pl-2 text-xs  text-red-900 ">Invalid Password Format</p>
                </div>
                <div className="bg-[#191817] rounded-md px-2 py-1">
                    <div class="relative ">
                        <input type="password" id="confirm_password"  class="px-2.5 pb-1 pt-5 w-full text-sm  bg-transparent focus:outline-none text-[#b3aea9] peer " placeholder=" " /> 
                        <span><VisibilityOffIcon className="text-[#7a7773] absolute top-4 left-[90%]"/><ErrorIcon className="text-red-900 absolute top-4 left-[79%] xs:left-[82%]  md:left-[81%]"/></span>

                        <label htmlFor="confirm_password" class="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773] peer-focus:border-0">Confirm Password</label>
                    </div>
                    <p id="filled_success_help" class="mt-0 pl-2 text-xs  text-red-900 ">Password does not match</p>
                </div>
                <div>
                    <p className="hidden md:block md:text-sm pt-2 pb-3 lg:text-[12px] text-[#53504d] font-medium ">By registering, you agree to our <span className="text-sun">Terms of Use</span> and <span  className="text-sun">Privacy Policy</span></p>
                    <button className="bg-sun rounded-md px-11 py-3 text-[12px] text-gray-900 font-bold">Register</button>
                    <p className="pt-4 mb-3 text-[14px] text-[#53504d] font-medium ">Already have an account?<span className="text-sun"><a href="#"> Login</a></span></p>
                </div>
                </form>
                
            </div>
        </div>
    </Fragment>
    );
};
export default Register;
