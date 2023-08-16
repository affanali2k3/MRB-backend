import { Op, literal } from "sequelize"
import { Post } from "../../Post/model/PostModel"

interface IFeedRepo {
    getFeedForUser({ userEmail, skipPosts, postsPerPage }: { userEmail: string, skipPosts: number, postsPerPage: number }): Promise<Post[]>

}

class FeedRepo implements IFeedRepo {
    async getFeedForUser({ userEmail, skipPosts, postsPerPage }: { userEmail: string, skipPosts: number, postsPerPage: number }) {
        try {
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
                  )
                `),
                    },
                },
                offset: skipPosts,
                limit: postsPerPage,
            });

            return posts;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

}

export default new FeedRepo;