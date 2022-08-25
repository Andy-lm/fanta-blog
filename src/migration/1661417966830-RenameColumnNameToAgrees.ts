import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnNameToAgrees1661417966830
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      "agrees",
      "userId::postId",
      "userIdToPostId"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      "agrees",
      "userIdToPostId",
      "userId::postId"
    );
  }
}
