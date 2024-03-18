import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { Comment } from "../../Comment/model/CommentModel";

export enum PostTypes {
  DEFAULT = "DEFAULT",
  MADE_REFERRAL = "MADE_REFERRAL",
  UPDATED_PROFILE = "UPDATED_PROFILE",
  LIKED_POST = "LIKED_POST",
  COMMENTED_ON_POST = "COMMENTED_ON_POST",
  SHARED_POST = "SHARED_POST",
}
@Table({
  tableName: Post.TABLE_NAME,
})
export class Post extends Model {
  // Define the table name for the Post model
  public static TABLE_NAME = "posts" as string;

  public static ID = "id" as string;
  public static USER_ID = "user_id" as string;
  public static TEXT = "text" as string;
  public static NAME = "name" as string;
  public static LIKES = "likes" as string;
  public static COMMENTS = "comments" as string;
  public static TYPE = "type" as string;
  public static MADE_REFERRAL_ID = "made_referral_id" as string;
  public static UPDATED_PROFILE_ID = "updated_profile_user_id" as string;
  public static SHARED_LIKED_COMMENTED_ID = "shared_liked_commented_post_id" as string;
  public static COMMENTED_ID = "commented_id" as string;

  @Column({
    type: DataType.INTEGER,
    field: Post.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: Post.USER_ID,
    references: { model: User, key: User.ID },
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.TEXT,
    field: Post.TEXT,
  })
  text!: string;

  @Column({
    type: DataType.STRING,
    field: Post.NAME,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    field: Post.LIKES,
    allowNull: false,
    defaultValue: 0,
  })
  likes!: number;

  @Column({
    type: DataType.INTEGER,
    field: Post.COMMENTS,
    allowNull: false,
    defaultValue: 0,
  })
  comments!: number;

  @Column({
    type: DataType.STRING,
    field: Post.TYPE,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.INTEGER,
    field: Post.MADE_REFERRAL_ID,
    // references: { model: , key: User.ID },
  })
  madeReferralId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Post.SHARED_LIKED_COMMENTED_ID,
    references: { model: Post, key: Post.ID },
  })
  sharedLikedCommentedId!: number;
}
