import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../features/UserProfile/model/User";
import { UserAssociates } from "../features/UserAssociates/model/UserAssociates";
import { Message } from "../features/Chat/model/MessageModel";
import { Post } from "../features/Post/model/PostModel";
import { PostImages } from "../features/Post/model/PostImages";
import { associations } from "./associations";
import { Like } from "../features/Like/model/LikeModel";
import { Comment } from "../features/Comment/model/CommentModel";
dotenv.config()

class Database {
    public sequelize: Sequelize | undefined;
    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;


    constructor() {
        this.connectToPostgreSQL()
    }

    private async connectToPostgreSQL() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            dialect: "postgres",
            models: [User, Post, PostImages, UserAssociates, Message, Like, Comment]
        });

        associations();

        this.sequelize.authenticate().then(() => {
            console.log("Postgres has been connected")
        }).catch((err) => {
            console.log(`Postgres connection Failed. ${err}`)
        })
    }
};

export default Database;