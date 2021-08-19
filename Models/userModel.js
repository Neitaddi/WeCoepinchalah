//require mongoose
const mongoose = require("mongoose");
//automatcly validator email
const { isEmail } = require("validator");
//require le bcrypt pour crypter un password
const bcrypt = require("bcrypt");

//create userSchema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    userLastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    userPassword: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    userPicture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    userBio: {
      type: String,
      max: 1024,
    },
    userFollowers: {
      type: [String],
    },
    userFollowing: {
      type: [String],
    },
    userLikes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//play function before saving data
//crypt Password with bcrypt
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
  next();
});

userSchema.statics.login = async function (userEmail, userPassword) {
  const user = await this.findOne({ userEmail });
  if (user) {
    const auth = await bcrypt.compare(userPassword, user.userPassword);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

//Popuplating this field of books to user s
// UserSchema.virtual('books', {
//   ref: 'Book',
//   foreignField: 'createdBy',
//   localField: '_id',
// });
// UserSchema.set('toJSON', { virtuals: true });
//=== END=======

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
