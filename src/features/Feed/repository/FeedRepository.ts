<<<<<<< HEAD
import { Op, literal } from "sequelize"; // Import necessary modules
import { Post } from "../../Post/model/PostModel"; // Import the Post model

// Interface for the Feed Repository
interface IFeedRepo {
    // Method to get the feed for a specific user
    getFeedForUser({ userEmail, skipPosts, postsPerPage }: { userEmail: string, skipPosts: number, postsPerPage: number }): Promise<Post[]>;
}

// Implement the Feed Repository interface
class FeedRepo implements IFeedRepo {
    // Method to get the feed for a specific user
    async getFeedForUser({ userEmail, skipPosts, postsPerPage }: { userEmail: string, skipPosts: number, postsPerPage: number }): Promise<Post[]> {
        try {
            // Query to fetch posts for the user's feed based on their associates
            const posts: Post[] = await Post.findAll({
                where: {
                    user_email: {
                        [Op.in]: literal(`(
                            SELECT associate_email
                            FROM user_associates
                            WHERE user_email = '${userEmail}' AND association_status = 'Accepted'
                            UNION
                            SELECT user_email
                            FROM user_associates
                            WHERE associate_email = '${userEmail}' AND association_status = 'Accepted'
                        )`),
                    },
                },
                offset: skipPosts, // Offset for pagination
                limit: postsPerPage, // Limit for pagination
            });

            return posts; // Return the fetched posts
        } catch (err) {
            throw new Error(`${err}`); // Throw an error if fetching the feed fails
        }
    }
}

export default new FeedRepo; // Export an instance of the FeedRepo class
=======
import { Op, literal } from "sequelize"; // Import necessary modules
import { Post } from "../../Post/model/PostModel"; // Import the Post model

// Interface for the Feed Repository
interface IFeedRepo {
    // Method to get the feed for a specific user
    getFeedForUser({ userId, skipPosts, postsPerPage }: { userId: number, skipPosts: number, postsPerPage: number }): Promise<Post[]>;
}

// Implement the Feed Repository interface
class FeedRepo implements IFeedRepo {
    // Method to get the feed for a specific user
    async getFeedForUser({ userId, skipPosts, postsPerPage }: { userId: number, skipPosts: number, postsPerPage: number }): Promise<Post[]> {
        try {
    
            // Query to fetch posts for the user's feed based on their associates
            const posts: Post[] = await Post.findAll({
                where: {
                    userId: {
                        [Op.in]: literal(`(
                            SELECT associate_id
                            FROM user_associates
                            WHERE user_id = '${userId}' AND association_status = 'Accepted'
                            UNION
                            SELECT user_id
                            FROM user_associates
                            WHERE associate_id = '${userId}' AND association_status = 'Accepted'
                        ) ORDER BY "createdAt" DESC`),
                    },
                },
                offset: skipPosts, // Offset for pagination
                limit: postsPerPage, // Limit for pagination
            });

            return posts; // Return the fetched posts
        } catch (err) {
            throw new Error(`${err}`); // Throw an error if fetching the feed fails
        }
    }
}

export default new FeedRepo; // Export an instance of the FeedRepo class
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
