import { MigrationInterface, QueryRunner, Table } from "typeorm";

/**
 * 存储文章点赞总数
 */
export class CreateAgreeCountTable1661415609007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "agreeCount",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "postId", type: "int" }, // 文章id
          {
            name: "count", // 文章点赞总数
            type: "int",
          },
          {
            name: "createdAt", // 创建时间
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updatedAt", // 更新时间
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("agreeCount");
  }
}
