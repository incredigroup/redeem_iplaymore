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
                <div className="flex-[0.4] md:flex-[0.4] md:pr-28 ">
                    <h1 className="text-2xl xs:text-4xl md:text-2xl lg:text-3xl text-sun tracking-wide font-extrabold pt-10 ">WELCOME BACK</h1>
                    <p className="text-slate-200 text-xs xs:text-lg md:text-sm ">Get in, aquire more gears and devices, redeem codes and get ready to play!
                    </p>
                </div>
                <div className="flex-[0.5] md:flex-[0.5] pt-10 ">
                    <div className="bg-[#191817]  rounded-md px-2 py-2 relative mb-5 ">
                            <p className="pl-1 py-1 text-[#EA1838] text-[7px] md:text-[10px]  font-extralight">Incorrect Login details, Email or Password is wrong</p>
                            <span><ErrorIcon className="text-[#EA1838] absolute top-[5px] left-[86%] xs:left-[90%] md:left-[90%]"/></span>
                    </div>
                    <form action="" className="space-y-2.5">
                    <div className="bg-[#191817] active:border-flame rounded-md px-2 py-1">
                        <div className="relative ">
                            <input type="text" id="firstname"  className="px-2.5 pb-2.5 pt-5 w-full text-sm  bg-transparent focus:outline-none bg-transparent text-[#b3aea9] peer " placeholder=" " />
                            <label htmlFor="firstname" className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773]   peer-focus:border-0">Username / Email Address</label>
                        </div>
                    </div>
                    <div className="bg-[#191817] rounded-md px-2 py-1">
                        <div className="relative ">
                            <input type="password" id="password"  className="px-2.5 pb-1 pt-5 w-full text-sm  bg-transparent focus:outline-none bg-transparent text-[#b3aea9] peer " placeholder=" " /> 
                            <span><VisibilityIcon className="text-[#7a7773] absolute top-4 left-[90%]"/></span>

                            <label htmlFor="password" className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-flame peer-focus:text-flame peer-placeholder-shown:text-[#7a7773] peer-focus:border-0">Password</label>
                        </div>
                    
                    </div>
                    <div>
                        <Link href="/auth/forgot">
                            <p className="pt-1 mb-3 text-[14px] text-sun font-medium hover:cursor-pointer" onClick={()=>changeNav('forgot')}>Forgot password?</p>
                        </Link>
                        <button className="bg-sun rounded-md px-11 mt-3 py-3 text-[12px] text-gray-900 font-bold">Login</button>
                        <p className="pt-4 mb-3 text-[14px] text-[#53504d] font-medium ">If you do not have an existing account &nbsp;
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
