"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;

require("reflect-metadata");

var _typeorm = require("typeorm");

var AppDataSource = new _typeorm.DataSource({
  type: "postgres",
  // host: NODE_ENV === "development" ? "localhost" : "172.17.0.2",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "123456",
  // database: NODE_ENV === "development" ? "blog_development" : "blog_production",
  database: "blog_development",
  synchronize: false,
  // 该值设置为false，避免我们在修改数据的时候导致一些数据被删除
  logging: false,
  entities: ["dist/entity/**/*.js"],
  // entities: [User],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"]
});
exports.AppDataSource = AppDataSource;