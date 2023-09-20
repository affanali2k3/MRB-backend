<<<<<<< HEAD
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Unique, Index } from "sequelize-typescript"; // Import necessary modules

@Table({
    indexes: [
        // Define an index with a unique constraint on the combination of POST_ID and USER_EMAIL fields
        {
            name: Like.UNIQUE_CONSTRAINT_POST_USEREMAIL,
            unique: true,
            fields: [Like.POST_ID, Like.USER_ID]
        },
    ],
    tableName: Like.TABLE_NAME // Set the table name for the Like model
})
export class Like extends Model {
    public static TABLE_NAME = "likes" as string; // Define the table name constant for the Like model
    public static ID = "like_id" as string; // Define the column name constant for the ID field
    public static POST_ID = "post_id" as string; // Define the column name constant for the POST_ID field
    public static USER_ID = "user_id" as string; // Define the column name constant for the USER_EMAIL field
    public static UNIQUE_CONSTRAINT_POST_USEREMAIL = "unique_constraint_post_userEmail" as string; // Define the unique constraint name

    @Column({
        type: DataType.INTEGER,
        field: Like.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number; // Define the ID field with auto-incrementing primary key

    @Column({
        type: DataType.INTEGER,
        field: Like.POST_ID,
        allowNull: false,
        references: { model: 'posts', key: 'post_id' }
    })
    postId!: number; // Define the POST_ID field with a foreign key reference to the 'posts' table

    @Column({
        type: DataType.INTEGER,
        field: Like.USER_ID,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
    })
    userId!:number; // Define the USER_EMAIL field with a foreign key reference to the 'users' table
}
=======
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Unique, Index } from "sequelize-typescript"; // Import necessary modules
import { User } from "../../UserProfile/model/User";
import { Post } from "../../Post/model/PostModel";

@Table({
    indexes: [
        // Define an index with a unique constraint on the combination of POST_ID and USER_EMAIL fields
        {
            name: Like.UNIQUE_CONSTRAINT_POST_USEREMAIL,
            unique: true,
            fields: [Like.POST_ID, Like.USER_ID]
        },
    ],
    tableName: Like.TABLE_NAME // Set the table name for the Like model
})
export class Like extends Model {
    public static TABLE_NAME = "likes" as string; // Define the table name constant for the Like model
    public static ID = "like_id" as string; // Define the column name constant for the ID field
    public static POST_ID = "post_id" as string; // Define the column name constant for the POST_ID field
    public static USER_ID = "user_id" as string; // Define the column name constant for the USER_EMAIL field
    public static UNIQUE_CONSTRAINT_POST_USEREMAIL = "unique_constraint_post_userEmail" as string; // Define the unique constraint name

    @Column({
        type: DataType.INTEGER,
        field: Like.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number; // Define the ID field with auto-incrementing primary key

    @Column({
        type: DataType.INTEGER,
        field: Like.POST_ID,
        allowNull: false,
        references: { model: Post, key: Post.POST_ID }
    })
    postId!: number; // Define the POST_ID field with a foreign key reference to the 'posts' table

    @Column({
        type: DataType.INTEGER,
        field: Like.USER_ID,
        allowNull: false,
        references: { model: User, key: User.ID},
    })
    userId!: number; // Define the USER_EMAIL field with a foreign key reference to the 'users' table
}
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
