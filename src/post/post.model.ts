import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { PostImages } from './post-images.model';

@Table
export class Post extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @Column
  name: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  likes: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  comments: number;

  @Column({
    allowNull: false,
  })
  type: string;

  @Column
  madeReferralId: number;

  @ForeignKey(() => Post)
  @Column
  sharedLikedCommentedId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  sharedLikedCommentedPost: Post;

  @HasMany(() => PostImages)
  postImages: PostImages[];
}
