import User from "../models/User.js";
// import Book, { BookDocument } from "../models/Book.js";

const resolvers = {
    Query: {
        getSingleUser: async (_parent: any, args: { id: any; username: any; }, _context: any, _info: any) => {
            const { id, username } = args;

            let query: { _id?: any, username?: any } = {}; // Update the type of the query variable

            if (id) {
                query._id = id;
            } else if (username) {
                query.username = username;
            }

            if (!id && !username) {
                throw new Error("You must provide either an id or a username.");
            }

            const user = await User.findOne(query).populate("savedBooks"); // Fix the typo in the model name

            if (!user) {
                throw new Error("Cannot find a user with that id or username.");
            }

            return user;
        }
}
};

export default resolvers;