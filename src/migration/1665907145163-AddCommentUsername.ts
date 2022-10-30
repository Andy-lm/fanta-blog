import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCommentUsername1665907145163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("comments", [
      new TableColumn({
        name: "commentUsername",
        type: "varchar",
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("comments", "commentUsername");
  }
}
