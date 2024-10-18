import User from "../models/User.js";
import bcrypt from "bcrypt";
// import Book, { BookDocument } from "../models/Book.js";
// import type { Request, Response } from "express";
// import { signToken } from "../utils/auth.js";

export const resolvers = {
    Query: {
        getSingleUser: async (_: any, { id, username }: { userId: string }) => {
            try {
                const foundUser = await User.findOne({
                    $or: [{ _id: id }, { username }],
                });
                if (!foundUser) {
                    throw new Error("Cannot find a user with this id or username!");
                }
                return foundUser;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },

    Mutation: {
        createUser: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
            try {
                const existingUser = await User.findOne({ $0r: [{ username }, {email} ]});
                if (existingUser) {
                    throw new Error("User already exists!");
            }

            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                 username,
                 email,
                 password: hashedPassword,
               });

               const savedUser = await newUser.save(); 

               return {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
               };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
};

