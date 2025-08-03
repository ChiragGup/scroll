import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// ✅ Correct usage of pre-save hook
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const user = this as IUser & mongoose.Document;
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
