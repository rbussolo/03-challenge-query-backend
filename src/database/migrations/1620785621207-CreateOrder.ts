import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrder1620785621207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "orders",
        columns: [{
          name: "id",
          type: "uuid",
          isPrimary: true, 
          generationStrategy: "uuid",
          default: "uuid_generate_v4()"
        },
        {
          name: "total_price",
          type: "float"
        },
        {
          name: "user_id",
          type: "uuid"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp"
        }],
        foreignKeys: [
          {
            name: "order_user_fk",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"]
          }
        ]
      }));

      await queryRunner.createTable(new Table({
        name: "orders_item",
        columns: [{
          name: "uuid",
          type: "varchar",
          isPrimary: true,
          generationStrategy: "uuid",
          default: "uuid_generate_v4()"
        },
        {
          name: "amount",
          type: "int"
        },
        {
          name: "unit_price",
          type: "float"
        },
        {
          name: "total_price",
          type: "float"
        },
        {
          name: "game_id",
          type: "uuid"
        },
        {
          name: "order_id",
          type: "uuid"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp"
        }],
        foreignKeys: [
          {
            name: "order_item_order_fk",
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            columnNames: ["order_id"]
          },
          {
            name: "order_item_game_fk",
            referencedTableName: "games",
            referencedColumnNames: ["id"],
            columnNames: ["game_id"]
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("orders_item");
      await queryRunner.dropTable("orders");
    }
}
