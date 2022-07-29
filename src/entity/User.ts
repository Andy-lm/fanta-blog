import { Post } from "./Post";
import { Comment } from "./Comment";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import * as _ from "lodash"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar")
  username: string;
  @Column("varchar")
  passwordDigest: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  password: string;
  passwordConfirmation: string;
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  };
  // 检测参数是否存在问题
  async validate() {
    if (this.username.trim() === "") {
      this.errors.username.push("用户名不能为空");
    }

    if (!/[a-zA-Z0-9_]/.test(this.username.trim())) {
      this.errors.username.push("用户名格式不合法，应只包括数字、字母、下划线");
    }

    if (this.username.trim().length > 42) {
      this.errors.username.push("用户名太长");
    }
    if (this.username.trim().length <= 3) {
      this.errors.username.push("用户名太短");
    }
    const found = await (
      await getDatabaseConnection()
    ).manager.findOne(User, {
      where: {
        username: this.username,
      },
    });

    if (found) {
      this.errors.username.push("用户名重复，请再试");
    }

    if (this.password.length < 6) {
      this.errors.password.push("密码太短");
    }
    if (this.password.length > 16) {
      this.errors.password.push("密码太长");
    }
    if (this.password.length === 0) {
      this.errors.password.push("密码不能为0");
    }
    if (this.passwordConfirmation !== this.password) {
      this.errors.passwordConfirmation.push("密码不匹配");
    }
  }
  // 检测
  hasErrors() {
    return !!Object.values(this.errors).find((v) => v.length > 0);
  }
  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password);
  }
  toJSON() {
    return _.omit(this, [
      "passwordConfirmation",
      "password",
      "passwordDigest",
      "errors",
    ]);
  }
}
