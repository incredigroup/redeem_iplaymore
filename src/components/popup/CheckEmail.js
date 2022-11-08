import { Fragment, useState } from "react";
import useClickOutside from "../../useClickOutside";

const CheckEmail = ({ open, close, checkUser, errorMessage }) => {
  const [email, userEmail] = useState(null);
  let domNode = useClickOutside(() => {
    close();
  });
  return (
    <Fragment>
      <div className={`edrea_tm_modalbox ${open ? "opened" : ""} email_modalbox`}>
        <div className="box_inner" ref={domNode}>
          <div className="close">
            <a href="#" onClick={() => close()}>
              <i className="icon-cancel" />
            </a>
          </div>
          <div className="description_wrap">
            <div className="about_popup_details">
              <div className="right no-padding">
                <div className="right_inner">
                  <div className="biography">
                    <div className="about_title">
                      <h3>
                        <span>
                          Type your Email.
                        </span>
                      </h3>
                    </div>
                    <div className="text">
                      <div className="list_inner" >
                        <div className="error">{errorMessage?errorMessage:''}</div>
                        <input
                          id="email"
                          type="email"
                          placeholder="email"
                          name="email"
                          onChange={(e) => userEmail(e.target.value)}
                        />
                      </div>
                      <div className="edrea_tm_button"> 
                        <a href='#register' className="a" style={{width:'50%', marginTop: '20px'}} onClick={() => checkUser(email)}>Continue</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default CheckEmail;
