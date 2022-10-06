import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("agrees")
export class Agree {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("int")
  userId: number;
  @Column("int")
  postId: number;
  @Column("int")
  agreeStatus: number;
  @CreateDateColumn()
  createdAt: Date;
  @Column("text")
  userIdToPostId: string;
}