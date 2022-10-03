"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;

require("reflect-metadata");

var _typeorm = require("typeorm");

// 该 dataSource 用来创建数据库
var AppDataSource = new _typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "123456",
  database: "blog_development",
  // 开发与生产环境共用一个数据库
  synchronize: false,
  // 该值设置为false，避免我们在修改数据的时候导致一些数据被删除
  logging: false,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"]
});
exports.AppDataSource = AppDataSource;