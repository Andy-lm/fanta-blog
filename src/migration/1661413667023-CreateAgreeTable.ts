import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

/**
 * 用户点赞表，存储用户点文章的赞关系
 */
export class CreateAgreeTable1661413667023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "agrees",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "userId", type: "int" }, // 点赞的用户id
          {
            name: "postId", // 被点赞的文章id
            type: "int",
          },
          {
            name: "agreeStatus", // 点赞状态：0代表没有点赞，1代表点赞
            type: "int",
            default: 1, // 默认添加数据的时候代表添加一条点赞记录，如果用户取消点赞时则记为0
          },
          {
            name: "createdAt", // 创建时间
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("agrees");
  }
}
