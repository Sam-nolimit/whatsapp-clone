import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google", passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);
 


//facebook routes

// route middleware to make sure
export function isLoggedIn(req: any, res: any, next: any) {
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/retry')
}

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }))




export default router