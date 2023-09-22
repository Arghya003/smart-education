const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const teacherSchema = new mongoose.Schema({
    profileimage: {
        type: String,
        default:
            "https://cdn.dribbble.com/users/1104126/screenshots/6737246/team.gif",
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        default: ''
    },
    password: {
        type: String,
    },
    qualification:{
        type: String,
    },
    experince:{
        type:String,
    },
    subject:{
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
})

teacherSchema.pre('save', async function (next) {

    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
            this.cfpassword = await bcrypt.hash(this.cfpassword, 12);
            // await this.save();
            next();
        }

    } catch (err) {
        console.log(err)
    }

})
teacherSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        return false;
    }
};

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;