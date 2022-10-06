import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class upDateComment1664979838085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("comments", [
      new TableColumn({
        name: "replayId",
        type: "int",
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: "parentId",
        type: "int",
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: "isDelete",
        type: "int",
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: "commentLikeCount",
        type: "int",
        isNullable: false,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("comments", "replayId");
    await queryRunner.dropColumn("comments", "parentId");
    await queryRunner.dropColumn("comments", "isDelete");
    await queryRunner.dropColumn("comments", "commentLikeCount");
  }
}
