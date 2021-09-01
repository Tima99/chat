import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { User } from '../models'
import { NewError } from "../services";

const authentication = async (req , res , next) =>{
    try{

        const { jwt : acess_token} = req.cookies;

        const {email : authUserEmail} = verify(acess_token , SECRET_KEY)

        console.log(authUserEmail)
        if(!authUserEmail) throw NewError.error(401 , 'Invalid Email')


        const userDocs = await User.findOne({tokens : { $elemMatch : {token : acess_token} } })

        if(!userDocs) throw NewError.error(401 , 'Unauthorised User try to access. Login or Create One ,first.')
        

        req.authUser = userDocs;
        req.acess_token = acess_token;

        next();
    }
    catch(err){
        console.log(err)
        return next(err)
    }
}

export default authentication;