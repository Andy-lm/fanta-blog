import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("int")
  userId: number;
  @Column("int")
  postId: number;
  @Column("int")
  replayId: number;
  @Column("int")
  parentId: number;
  @Column("int")
  isDelete: number;
  @Column("int")
  commentLikeCount: number;
  @Column("text")
  content: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
