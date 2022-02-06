import registerSchema from '../../services/validateSchema'
import bcrypt from 'bcrypt'
import { NewError , generateJwt , emailVerifyLink ,sendEmail } from '../../services'
import { User } from '../../models'

//! Checklist
  // [+] 
  /// validate the request
  // [+] 
  /// check user is already exists in database
  // [+] 
  /// prepare model
  // [+] 
  /// generate jwt token , save it to cookie...
  // [+] 
  /// store in database
  // [+]
  /// verify email 
  // [+] 
  /// send response

const registerController = {
    async register(req, res, next) {
      try{

        // todo : validate the request

        const { error } = registerSchema.validate(req.body) 

        if(error) throw error; /// if any validation error occur throw error and thats calls to errorHandlerMiddlware

        // end 

        // todo : check user already exists in database by checking email and username

        const { username , email , password } = req.body;

        const existsEmail       = await User.exists({ email })
        const existsUsername    = username && await User.exists({ username })

        if(existsUsername) throw NewError.error(409 , 'Username should be unique.')
        if(existsEmail) throw NewError.error(409 , 'Email Already Exists.')

        // end

        // todo :  prepare model for new user

        const hashPassword = await bcrypt.hash(password , 10)
        const user = await User({
            username,
            email,
            password : hashPassword
        })

        // end

        // todo : generate jwt token and save to cookie...

        const acess_token = generateJwt({email} , '7d')
        user.tokens.push({token : acess_token})

        res.cookie('jwt' , acess_token ); /// save to user browser as cookie
        
        // end

        // todo : store in database

        const registerUser = await user.save()
        // console.log(registerUser)

        // end

        // todo : verify email
        
        const verify_link = emailVerifyLink({email})

        // sendEmail(verify_link);

        // end


        res.json({register : true}); // Register Done!

      }
      catch(err){
        console.log(`Error : ${err.message} \n InFile : ${__filename} \n`)
        return next(err)
      }
        
        
    }
};

export default registerController;
