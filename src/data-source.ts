import "reflect-metadata";
import { DataSource } from "typeorm";

// 该 dataSource 用来创建数据库
export const AppDataSource = new DataSource({
  type: "postgres",
  host:"localhost",
  port: 5432,
  username: "blog",
  password: "123456",
  database: "blog_development", // 开发与生产环境共用一个数据库
  synchronize: false, // 该值设置为false，避免我们在修改数据的时候导致一些数据被删除
  logging: false,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"],
});