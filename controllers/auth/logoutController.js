import { NewError } from "../../services";

const logoutController = {
    async logout(req , res , next){
        try{
            
            const userLogin   = req.authUser;
            const acess_token = req.acess_token; 

            const tokenIndex = userLogin.tokens.findIndex( (token , index) => token.token === acess_token)
            if(tokenIndex === -1) throw NewError.error(401, "Token not found.")

            userLogin.tokens.splice(tokenIndex , 1)
            
            const userLogOut = await userLogin.save()
            res.clearCookie();
            
            console.log(userLogOut)
            
            res.json({ logout : true , message : "You have to login again."})
        }
        catch(err){
            console.log(`Error : ${err.message} \nInFile : ${__filename}\n`)
            return next(err)
        }
    }
}

export default logoutController;