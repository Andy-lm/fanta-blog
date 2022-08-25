import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameAgreeCountTable1661417356675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("agreeCount", "agree_count");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("agree_count", "agreeCount");
  }
}
