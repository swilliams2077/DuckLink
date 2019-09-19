var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(new LocalStrategy(
  {usernameField: "username"},
  function(username, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({username: username}
    ).then(function(dbUser) {
      console.log(dbUser)
      // dbUser["Albums"].forEach(x => console.log(x.name));

      // If there's no user with the given username
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect Username."
        });
      }
      // If there is a user with the given username, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;