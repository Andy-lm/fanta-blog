import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

/**
 * 增加一agrees表列数据用来索引，方便查询
 */
export class AddRelationToAgrees1661416351233 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("agrees", [
      new TableColumn({
        name: "userId::postId",
        type: "varchar",
        isUnique: true,
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("agrees", "userId::postId");
  }
}
