import { loginSchema } from "../../services/validateSchema"
import { NewError } from "../../services";
import { User } from "../../models";
import bcrypt from "bcrypt"
import generateJWT from "../../services/generateJWT";

const loginController = {
    async login(req , res , next){
        try{

            // todo : validate request
            const { error } = loginSchema.validate(req.body)

            if(error) throw error;

            // todo : email exists

            const {email , password } = req.body;
            
            const userRegistered = await User.findOne({email})

            if(!userRegistered) throw NewError.error(409 , 'Email not registered.')

            // todo : email verified
            isEmailVerify(userRegistered);

            // todo : check password correct
            const match = await bcrypt.compare(password , userRegistered.password)
            if(!match) throw NewError.error(409 , "Wrong Password.")

            // todo : if password matched generate jwt

            const acess_token = generateJWT({email}, '7d')
            userRegistered.tokens.push({ token : acess_token})
            res.cookie('jwt' , acess_token);

            // console.log(userRegistered)

            // todo : store in database
            const userLogin = await userRegistered.save()
            
            res.json({login : true}) // Login Done!
        }
        catch(err){
            console.log(`Error : ${err.message} \nInFile : ${__filename}\n`)
            return next(err)
        }
    }
}

function isEmailVerify(userDocs){
    if(!userDocs.email_verify)
        throw NewError.error(401 , "Verify your email.") // if email not verify
}

export default loginController;