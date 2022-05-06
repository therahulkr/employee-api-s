const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const employeeSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

employeeSchema.pre('save',async function(next){
    if(!this.isModified("password")) next();
    
    this.password = await bcrypt.hash(this.password,10);//10 is power
});

employeeSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User',employeeSchema);