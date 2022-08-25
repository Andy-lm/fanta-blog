import { MigrationInterface, QueryRunner, TableIndex } from "typeorm"

export class AddUniqueUsernameToUsers1658739098138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // createIndex创建一个索引用于提高查询效率
        await queryRunner.createIndex("users",new TableIndex({
            name:"users_username",
            columnNames:["username"],
            isUnique:true
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users","users_username")
    }
}
