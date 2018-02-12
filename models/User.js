const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    profile_pic: {
        pic_path:{
            type: String,
            default: "https://vignette.wikia.nocookie.net/lossimpson/images/9/9d/Maggie_Simpson.png/revision/latest?cb=20100529224628&path-prefix=es",
            required: [true, 'Please enter path avatar']
          },
        pic_name:{
            type: String,
            default: "Profile Picture",
            required: [true, 'Please enter avatar name']
          },
        }
}, {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;