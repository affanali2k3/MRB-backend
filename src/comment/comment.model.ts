import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@Table
export class Comment extends Model {
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

  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @BelongsTo(() => Post)
  post: Post;

  @BelongsTo(() => User)
  user: User;
}
