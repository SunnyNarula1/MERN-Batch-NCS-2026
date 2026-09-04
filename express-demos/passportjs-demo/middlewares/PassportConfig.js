import passport from "passport"
import LocalStrategy from "passport-local"
import UserModel from "../models/UserModel.js"
import bcrypt from "bcryptjs"

passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"}, async function(username, password, done){
    const user = await UserModel.findOne({email: username})
    if(!user) {
        return done(null, false, {message: 'Incorrect Email'})
    }
    if(!bcrypt.compareSync(password, user.password)){
        return done(null, false, {message: 'Incorrect Password'})
    }
    return done(null, user)
}))

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

export default isLoggedIn