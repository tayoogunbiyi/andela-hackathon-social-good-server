/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const express = require('express');
const uuidv4 = require('uuid/v4');
const { joiValidate } = require('express-joi');
const passport = require('passport');
const { registrationSchema, loginSchema } = require('../../validation/validationSchemas');
const { USER_ACCOUNT_TYPE, ORG_ACCOUNT_TYPE, ORG_FIELDS } = require('../../constants/index');

const { BASE_URL } = process.env;
const { buildResponse } = require('../../services/responseBuilder');
const messages = require('../../services/responseMessages');

const User = mongoose.model('User');

const OrgProfile = mongoose.model('OrgProfile');


const router = express.Router();

router.post('/register', joiValidate(registrationSchema), async (req, res) => {
  let orgProfile = null;
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json(buildResponse(
      messages.EMAIL_NOT_AVAILABLE,
    ));
  }
  const newUser = new User(req.body);
  const hash = await User.generateHash(req.body.password);
  if (!hash) {
    return res.status(500).json(
      buildResponse(
        messages.SERVER_ERROR,
      ),
    );
  }
  newUser.password = hash;

  const { accountType } = req.body;
  if (accountType === ORG_ACCOUNT_TYPE) {
    newUser.userType = 'ORG';
    orgProfile = new OrgProfile();
    for (let i = 0; i < ORG_FIELDS.length; i += 1) {
      const field = ORG_FIELDS[i];
      if (!req.body[field]) {
        return res.status(400).json(buildResponse(
          `${messages.MISSING_FIELD} - Organization's ${field}`,
          null,
          false,
        ));
      }
      orgProfile[field] = req.body[field];
    }
  } else if (accountType !== ORG_ACCOUNT_TYPE && accountType !== USER_ACCOUNT_TYPE) {
    return res.status(400).json(buildResponse(
      `${messages.MISSING_FIELD} - Account Type`,
      null,
      false,
    ));
  }
  try {
    newUser.save();
    if (orgProfile) {
      orgProfile.user_id = newUser;
      orgProfile.save();
    }
    return res.status(201).json(
      buildResponse(
        `Registered ${messages.SUCCESS_MESSAGE}`,
        {
          ...newUser.toJSON(),
        },
        true,
      ),
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(buildResponse(messages.SERVER_ERROR));
  }
});

router.post('/login', joiValidate(loginSchema), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const response = buildResponse(
      messages.INVALID_CREDENTIALS,
    );
    return res.status(401).json(response);
  }
  const token = await user.generateJWT(req.body.password);
  if (!token) {
    const response = buildResponse(
      messages.INVALID_CREDENTIALS,
    );
    return res.status(401).json(response);
  }

  return res.json(buildResponse(
    `Logged in ${messages.SUCCESS_MESSAGE}`,
    {
      token,
    },
    true,
  ));
});

// router.get('/confirm-account', async (req, res) => {
//   const confirmationToken = req.query.token;
//   const user = await User.findOne({ confirmationToken });
//   if (user) {
//     user.active = true;
//     user.confirmationToken = null;
//     user.save();
//     return res.status(200).json(buildResponse(
//       `Account activated${messages.SUCCESS_MESSAGE}`,
//       null,
//       true,
//     ));
//   }
//   return res.status(400).json(buildResponse(
//     messages.INVALID_CREDENTIALS,
//   ));
// });

// router.post('/forgot-password', joiValidate(resetPasswordSchema), async (req, res) => {
//   const PasswordTokenObj = await PasswordToken.findOne({ uuid: req.body.token });
//   const tokenNotExpired = PasswordTokenObj ? await PasswordTokenObj.isNotExpired() : false;
//   if (PasswordTokenObj && tokenNotExpired) {
//     const user = await User.findById(PasswordTokenObj.user);
//     if (!user) {
//       return res.status(400).json(buildResponse(
//         messages.NOT_FOUND,
//       ));
//     }
//     const hash = await User.generateHash(req.body.newPassword);
//     if (!hash) {
//       return res.status(500).json(buildResponse(
//         messages.SERVER_ERROR,
//       ));
//     }
//     user.password = hash;
//     user.save();
//     return res.status(200).json(buildResponse(
//       `Password reset ${messages.SUCCESS_MESSAGE}`,
//       null,
//       true,
//     ));
//   }
//   return res.status(400).json(buildResponse(
//     messages.INVALID_TOKEN,
//   ));
// });

// router.get('/forgot-password', async (req, res) => {
//   const { email } = req.query;
//   if (!email) {
//     return res.status(400).json(buildResponse(
//       `${messages.MISSING_FIELD}- email `,
//     ));
//   }
//   const user = await User.findOne({ email: req.body.email });
//   if (user) {
//     const resetPasswordToken = uuidv4();
//     const expiresAt = new Date();
//     expiresAt.setHours(expiresAt.getHours() + 1);
//     const newPasswordToken = new PasswordToken({ uuid: resetPasswordToken, user, expiresAt });
//     newPasswordToken.save();
//     sendMail(
//       user.email,
//       FORGOT_PASSWORD_TEMPLATE_ID, {
//         resetPasswordUrl: `${BASE_URL}/${resetPasswordToken}`,
//         name: user.name,
//       },
//     );
//   }
//   // same response for either when email is valid/not
//   return res.status(200).json(
//     buildResponse(
//       `Reset link sent ${messages.SUCCESS_MESSAGE}`,
//       null,
//       true,
//     ),
//   );
// });

module.exports = router;
