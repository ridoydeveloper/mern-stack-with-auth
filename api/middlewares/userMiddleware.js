import createError from "../controllers/errorController.js";
import  Jwt  from "jsonwebtoken";
// check user is authenticated or not
export const userMiddleware = ( req , res , next ) => {


   try {


    const token = req.cookies.access_token;

     // check token


     if(!token){

        return next(createError(401,"You are not authenticated"));
    }

    // if logeed in

    const login_user = Jwt.verify( token , process.env.JWT_SECRET);

    if(!login_user){

        return next(createError(401, "Invalid token"))
    }

    if(login_user.id !== req.params.id){

        return next(createError(401, "You are not be able to access this feture"))
    }

    
   if(login_user){

     req.user = login_user;
     next();
   }

   } catch (error) {

    return next(error)
    
   }


}