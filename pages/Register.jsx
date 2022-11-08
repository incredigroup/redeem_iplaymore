import { useContext, useState, useEffect } from "react";
import { context } from "@/src/hooks/context";
import { ethers } from "ethers";

const Register = ( {route } ) => {
  const navContext = useContext(context);
  const { account, storeAccount } = navContext;
  const [mailData, setMailData] = useState({ name: "", email: "", wallet: ""});
  const { name, email} = mailData;
  const [localState, setError] = useState({error: null, errorText: ''});
  
  useEffect(() => {
    connectMetaMask()
  }, [])

  const connectMetaMask = () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      var signer = provider.getSigner();
      // setSanctionsSmartContract(SanctionsContract.connect(signer));
      window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => accountChangeHandler(res[0]));
    } else {
      // alert("install metamask extension!!");
      storeAccount({account:'', extensionState: false})
    }
  };

  const accountChangeHandler = (walletAddress) => {
    storeAccount({account:walletAddress, extensionState: true})
    setMailData({ ...mailData, wallet: walletAddress});
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (name.length === 0 || email.length === 0) {
      setError({...localState, error: true, errorText:"Please Fill Required Fields"});
    } else if (!account){
      setError({...localState, error: true, errorText:"Please Connect with MetaMask"});
    } else {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mailData),
      });
      const data = await res.json();
      if (res.status === 200) {
        setError({...localState, error: false, errorText:"Please Fill Required Fields"});
        setMailData({ name: "", email: ""});
      } else if(res.status === 201) {
        setError({...localState, error: true, errorText:data.message});
      } else {
        // console.log(err.text); 
      }
    }
    clearError();
  };
  const clearError = () => {
    setTimeout(() => {
      setError({...localState, error: null, errorText:""});
    }, 3000);
  };

  return (
    <div className="edrea_tm_section hidden animated" id="register">
      <div className="section_inner">
        <div className="edrea_tm_contact">
          <div className="edrea_tm_main_title">
            <h3>
              Register to <span className="coloring">iPlayMore</span>
            </h3>
          </div>
          <div className="wrapper">
            <div className="right" style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <div className="fields">
                <form
                  className="contact_form"
                  id="contact_form"
                  onSubmit={(e) => onSubmit(e)}
                  style={{width: '100%'}}
                >
                  <div className="returnmessage"  data-success="You are now entered to test THUNDER! ©"/>
                  <div className={localState.error ? "empty_notice" : "returnmessage"} style={{ display: localState.error === null? "none" : "block" }}>
                    <span>{localState.error ? localState.errorText : "You are now entered to test THUNDER! ©"}</span>
                  </div>
                  <div className="first">
                    <ul style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <li>
                        <div className="list_inner">
                          <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={(e) => setMailData({ ...mailData, [e.target.name]: e.target.value})}
                            value={name}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="list_inner">
                          <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={(e) => setMailData({ ...mailData, [e.target.name]: e.target.value})}
                            value={email}
                            placeholder="Email"
                            autoComplete="off"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="list_inner">
                          <input
                            id="wallet"
                            type="text"
                            placeholder={account?account:"No connection with MetaMask"}
                            name="wallet"
                            // value={account}
                            disabled
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="edrea_tm_button">
                    <input className="a" type="submit" value="Submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
