/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrgProfileSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

OrgProfileSchema.methods.toJSON = function () {
  const obj = this.toObject();
  const fieldsToDelete = ['password', '__v'];
  fieldsToDelete.forEach((field) => {
    delete obj[field];
  });
  return obj;
};

module.exports = mongoose.model('OrgProfile', OrgProfileSchema);
