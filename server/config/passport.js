const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

passport.use('localLogin', new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  let user = await User.findOne({
    email: email
  });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return done(null, false, {
      error: 'Your login details could not be verified. Please try again.'
    });
  }
  user = user.toObject();
  delete user.hashedPassword;
  return done(null, user);
}));

passport.use('jwtLogin', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  let user = await User.findById(payload._id);
  if (!user) {
    return done(null, false);
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
}));

module.exports = passport;
