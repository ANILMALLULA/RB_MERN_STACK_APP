const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const JWTStrategy = require("passport-jwt").Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

//authorization
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "Applore",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (error, user) => {
        if (error) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// Authentication using username and password
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      //Something went wrong with Db
      if (err) return done(err);
      //No username found
      if (!user) return done(null, false);
      //Check if password matches?
      user.comparePassword(password, done);
    });
  })
);
