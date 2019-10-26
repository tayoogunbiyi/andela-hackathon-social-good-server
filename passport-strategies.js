// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const mongoose = require('mongoose');

// const User = mongoose.model('OauthUser');

// const google = new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID || 'null',
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'null',
//   callbackURL: process.env.GOOGLE_CALLBACK_URL || 'null',
// },
// (async (accessToken, refreshToken, profile, cb) => {
//   try {
//     const googleObject = { oauthId: profile.id };
//     let user = await User.findOne(googleObject);

//     if (!user) {
//       user = await User.create({
//         ...googleObject,
//         name: profile.displayName,
//         role: 'USER',
//         email: profile.emails[0].value,
//       });
//     }

//     cb(undefined, user, accessToken);
//   } catch (error) {
//     cb(error, undefined, undefined);
//   }
// }));

// const facebook = new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID || 'null',
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'null',
//   callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'null',
//   profileFields: ['id', 'email', 'name'],
// },
// (async (accessToken, refreshToken, profile, cb) => {
//   try {
//     const facebookObject = { oauthId: profile.id };
//     let user = await User.findOne(facebookObject);
//     console.log(refreshToken, profile, accessToken);

//     if (!user) {
//       user = await User.create({
//         ...facebookObject,
//         name: `${profile.name.givenName} ${profile.name.familyName}`,
//         role: 'USER',
//         email: profile.emails[0].value,
//       });
//     }

//     cb(undefined, user, accessToken);
//   } catch (error) {
//     cb(error, undefined, undefined);
//   }
// }));

// module.exports = { google, facebook };
