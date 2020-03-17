import { Schema, model, Document } from 'mongoose'
import { compare, genSaltSync, hashSync } from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document, UserMethor {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserMethor {
    checkPassword(password: string): Promise<boolean>
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})

UserSchema.pre('save', function (next) {
    var user: any = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        let salt = genSaltSync(SALT_WORK_FACTOR);     // generate a salt
        let hash = hashSync(user.password, salt); // generate hash
        user.password = hash;
        next();
    }
    catch (e) {
        return next(e)
    }
});

UserSchema.methods.checkPassword = async function (password: string) {
    try {
        return await compare(password, this.password);
    } catch (e) {
        return false;
    }
};

const UserModel = model<IUser>('users', UserSchema)

export default UserModel;