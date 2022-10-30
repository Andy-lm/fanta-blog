import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddReplayUsername1665975792227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("comments", [
      new TableColumn({
        name: "replayUsername",
        type: "varchar",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("comments", "replayUsername");
  }
}
