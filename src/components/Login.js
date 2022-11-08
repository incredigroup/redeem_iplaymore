import { Fragment, useContext, useState } from "react";
import { context } from "../context/context";
import CheckEmail from "./popup/CheckEmail";

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
            <CheckEmail
                open={popup}
                close={() => setPopup(false)}
                // checkUser={checkUser}
                checkUser={(email) => checkUser(email)}
                errorMessage= {errorMessage}
            />
            <div className="edrea_tm_section hidden animated" id="signin">
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
            </div>
        </Fragment>
    );
};
export default Register;
