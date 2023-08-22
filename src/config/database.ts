import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../features/UserProfile/model/User";
import { UserAssociates } from "../features/UserAssociates/model/UserAssociates";
import { Message } from "../features/Chat/model/MessageModel";
import { Post } from "../features/Post/model/PostModel";
import { PostImages } from "../features/Post/model/PostImages";
import { PostShare } from "../features/PostSharing/model/PostSharingModel";
import { Like } from "../features/Like/model/LikeModel";
import { Comment } from "../features/Comment/model/CommentModel";

dotenv.config(); // Load environment variables from .env file

class Database {
    public sequelize: Sequelize | undefined;

    // Environment variables for PostgreSQL configuration
    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

    constructor() {
        this.connectToPostgreSQL(); // Call the method to establish PostgreSQL connection
    }

    private async connectToPostgreSQL() {
        // Create a Sequelize instance with PostgreSQL connection details and models
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            dialect: "postgres", // Use PostgreSQL dialect
            models: [User, UserAssociates, Post, PostImages, Message, Like, Comment, PostShare]
        });

        // Authenticate the connection and handle success or failure
        this.sequelize.authenticate().then(() => {
            console.log("Postgres has been connected");
        }).catch((err) => {
            console.log(`Postgres connection Failed. ${err}`);
        });
    }
}

export default Database; // Export the Database class as the default export
