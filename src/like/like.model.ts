import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@Table({
  indexes: [
    {
      name: 'unique_constraint_post_userEmail',
      unique: true,
      fields: ['postId', 'userId'],
    },
  ],
})
export class Like extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Post)
  @Column({
    allowNull: false,
  })
  postId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Post)
  post: Post;

  @BelongsTo(() => User)
  user: User;
}
