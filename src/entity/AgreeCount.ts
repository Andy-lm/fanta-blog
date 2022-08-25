import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("agree_count")
export class Agree {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("int")
  postId: number;
  @Column("int")
  count: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
