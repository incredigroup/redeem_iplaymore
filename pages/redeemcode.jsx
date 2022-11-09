import { Fragment, useState, useContext } from "react";
import { context } from "@/src/hooks/context";

import Link from 'next/link';

const RedeemCode = ( { data } ) => {
  const navContext = useContext(context);
  const {changeNav} = navContext;
  return (
    <Fragment>
      <div className="flex md:flex-row" >
          {/* width css issues */}
          <div className="flex-[0.5] md:flex-[0.5] ">
              <h1 className="h1-text-responsive tracking-wide font-extrabold pt-10">Redeem Code</h1>
              <p className="descri-text">Get Redeemable codes from any of our live streams and enter them on the right
              </p>
          </div>
          <div className="flex-[0.4] md:flex-[0.4] pt-10 ">
              <form action="" className="space-y-2.5">
                  <div className="m-bg-color">
                      <div className="relative">
                          <input type="text" id="email"  className="form-input peer " placeholder=" " />
                          <label htmlFor="redeemcode" className="chasing-text">Code</label>
                      </div>
                  </div>
                  <div>
                    <button className="auth-button">Redeem Code</button>
                  </div>
              </form>
          </div>
      </div>
    </Fragment>
  );
};
export default RedeemCode;

