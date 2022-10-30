import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("int")
  userId: number;
  // 发送评论的用户名
  @Column("varchar")
  commentUsername: string;
  @Column("int")
  postId: number;
  @Column("int")
  replayId: number;
  // 评论所针对的用户名
  @Column("varchar")
  replayUsername: string;
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
  children?: Comment[];
}
