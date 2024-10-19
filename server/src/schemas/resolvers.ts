import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BookDocument } from "../models/Book.js";
// import type { Request, Response } from "express";
// import { signToken } from "../utils/auth.js";

export const resolvers = {
    Query: {
        getSingleUser: async (_: any, { userId }: { userId: string }) => {
            try {
                const { username } = _; // Declare the 'username' variable
                const foundUser = await User.findOne({
                    $or: [{ _id: userId }, { username }],
                });
                if (!foundUser) {
                    throw new Error("Cannot find a user with this id or username!");
                }
                return foundUser;
            } catch (error) {
                throw new Error((error as Error).message);
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
            throw new Error((error as Error).message);
        }
    },
},
     login: async (_: any, { password }: { email: string, password: string }) => {
            try {
                const { username, email } = _; // Declare the 'username' and 'email' variables

                const foundUser = await User.findOne({
                    $or: [{ username }, { email }],
                });

                if (!foundUser) {
                    throw new Error("Cannot find a user with this email or username!");
                }

                const validPassword = await bcrypt.compare(password, foundUser.password);

                if (!validPassword) {
                    throw new Error("Incorrect password!");
                }

                const token = jwt.sign(
                    { _id: foundUser._id, username: foundUser.username },
                    process.env.JWT_SECRET || '',
                    { expiresIn: "1hr" }
                );

              return {
             _id: foundUser._id,
             username: foundUser.username,
             email: foundUser.email,
             token,
            };
      } catch (error) {
          throw new Error((error as Error).message);
    }
  },

  saveBook: async (_: any, { user, book }: { user: string, book: string }) => {
      try {
          const updatedUser = await User.findById(user);

            if (!updatedUser) {
              throw new Error("User does not exist!");
          }

        const foundBook = await User.findById(book) as BookDocument;

        if (!foundBook) {
            throw new Error("Book does not exist!");
        }

        const alreadySaved = updatedUser.savedBooks.some((savedBook: any) => savedBook._id.toString() === book);

        if (alreadySaved) {
            throw new Error("Book already saved!");
        }

        updatedUser.savedBooks.push(foundBook);

        await updatedUser.save();

            return updatedUser;
        } catch (error) {
            throw new Error((error as Error).message);
        } 

    },

    deleteBook: async (_: any, { user, book }: { user: string, book: string }) => {
        try {
            const foundUser = await User.findById(user);

            if (!foundUser) {
                throw new Error("User does not exist!");
            }

            const bookIndex = foundUser.savedBooks.findIndex(
                (savedBook: any) => savedBook._id.toString() === book
            );

            if (bookIndex === -1) {
                throw new Error("Book not found!");
            }

            foundUser.savedBooks.splice(bookIndex, 1);

            await foundUser.save();

            return foundUser;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
};