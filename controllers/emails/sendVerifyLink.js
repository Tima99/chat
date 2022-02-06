import { emailVerifyLink } from "../../services";

const sendVerifyLink = {
    async verifyLink(req , res , next){
        try {
            
            const email = req.authUser.email;

            const link = emailVerifyLink({email, email_verify : true})
            res.send(link)

        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

export default sendVerifyLink;