// reflect-metadata的作用是让我们可以在声明的时候添加和读取元数据
import "reflect-metadata";
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";
import { DataSource } from "typeorm";
import { Agree } from "src/entity/Agree";
import { AgreeCount } from "src/entity/AgreeCount";

const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV, "======NODE_ENV");
// 注意：DataSource的参数也可以放在ormconfig.json文件里作为全局配置
export const AppDataSource = new DataSource({
  type: "postgres",
  /** 
  在本地连接postgresql时通过localhost，如果是docker容器中需要使用容器的IPA地址
  可通过docker inspect <容器名> | grep IPAddress来获取
  */
  host: NODE_ENV === "development" ? "localhost" : "172.17.0.2",
  port: 5432,
  username: "blog",
  password: "123456",
  database: "blog_development",
  synchronize: false, // 该值设置为false，避免我们在修改数据的时候导致一些数据被删除
  logging: false,
  //   entities: ["dist/entity/**/*.js"],
  entities: [Post, User, Comment, Agree, AgreeCount], // 通过reflect-metadata就可以拿到Post、User、 Comment这些entity上的属性名、属性值类型
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"],
});