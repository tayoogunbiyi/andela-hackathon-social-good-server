const express = require('express');
const passport = require('passport');

require('../config/passport-config')(passport);

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ title: 'Express' });
});

router.use('/auth', require('./auth'));

// router.use('/admin', passport.authenticate('jwt', { session: false }), require('./admin'));
// router.use('/superadmin', passport.authenticate('jwt', { session: false }), require('./superadmin'));

module.exports = router;
