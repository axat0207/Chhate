import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    username: {type: String},
    password: {type: String, required:true},
    email: { type: String },
    fullName: { type: String },
})
const User = mongoose.model('User', userSchema);
export default User;