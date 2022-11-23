import _, { get, startCase, toLower, some } from 'lodash';

import dbConnect from '@/utils/dbConnect';
import User, { checkUserByWallet } from '@/models/User';

export default async function handler(
  req, 
  res
) {
  const {  body, method } = req;

  await dbConnect();
  switch (method) {

    case 'POST':
      // try {
        let { email, password } = body;
        console.log(body);
        // const exsitingUser = await User.find({
        //   $or: [
        //     {wallet: wallet},
        //     {email: email}
        //   ]
        // })
        // // const exsitingUser = checkUserByWallet(dbConnect, wallet);
        // console.log(exsitingUser);
        // if(_.isEmpty(exsitingUser)) {
          
        //   name = startCase(name)
        //   const created_at = new Date()
        //   const user = await User.create({wallet,name, email, route, created_at});
        //   return res.status(200).json({ success: true, message: 'Success', user: user});
        // } else {
        //   console.log("not user");
        //   return res.status(201).json({ success: true, message: 'Already Registered User', user: exsitingUser });
        // }
      // } catch (error) {
      //   console.log(error.message)
      //   res.status(400).json({ success: false, message: error.message });
      // }
      break;

    case 'GET':
      // if (!req.user) {
      //   return res.status(401).end();
      // } else {
        const value = req.query.value;
        if (value) {
          // const user = await User.findOne({
          //   value: value,
          // }).then((user) => user || null);
          const user = await User.find({
            $or: [
              {wallet: value},
              {email: value}
            ]
          })
          if(_.isEmpty(user)) {
              res.status(400).json({ success: false, message: "Not registered User" });
          } else {
            return res.status(200).json({ success: true, message: 'Success', user: user });
          }
        } else {
          res.status(400).json({ success: false, message: error.message });
        }
      // }
      
     
    break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
