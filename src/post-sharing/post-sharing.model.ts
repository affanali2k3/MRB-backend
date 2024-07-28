import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@Table
export class PostShare extends Model {
  @ForeignKey(() => Post)
  @Column({
    allowNull: false,
  })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
