import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { User } from "../../models";
import { NewError } from "../../services";

const emailVerifyController = {
  async emailVerify(req, res, next) {
    try {

      const { email_verify_token } = req.params;

      const { email }  = await jwt.verify(email_verify_token, SECRET_KEY);

      const user = await User.findOne({ email });

      if (!user) throw NewError.error(401, "New user try to verify email.");

      if(user.email_verify) throw NewError.error(403 , "Your email already verified. Thanking you.")

      user.email_verify = true;
      await user.save()

      res.json({email_verify : true})  

    } catch (err) {
      console.log( 'Error : ' + err.message + '\nInfile : ' + __filename);
      return next(err);
    }

  },
};

export default emailVerifyController;
