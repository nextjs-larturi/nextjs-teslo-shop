import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true  },
    role: { 
        type: String, 
        required: true, 
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} no es un rol valido',
            default: 'client',
        }
    }
}, {
    timestamps: true
});

userSchema.index({ title: 'text', tags: 'text' });

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;