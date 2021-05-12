import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGenres1620784819251 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "genres",
        columns: [{
          name: "id",
          type: "uuid",
          isPrimary: true,
          generationStrategy: "uuid",
          default: "uuid_generate_v4()"
        },
        {
          name: "name",
          type: "varchar"
        },
        {
          name: "description",
          type: "varchar"
        }, 
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp"
        }
      ]}));

      await queryRunner.createTable(new Table({
        name: "genres_games",
        columns: [{
          name: "id",
          type: "uuid",
          isPrimary: true,
          generationStrategy: "uuid",
          default: "uuid_generate_v4()"
        },
        {
          name: "genresId",
          type: "uuid"
        },
        {
          name: "gamesId",
          type: "uuid"
        }],
        foreignKeys: [
          {
            name: "genres_games_genres_FK",
            referencedTableName: "genres",
            referencedColumnNames: ["id"],
            columnNames: ["genresId"]
          },
          {
            name: "genres_games_games_FK",
            referencedTableName: "games",
            referencedColumnNames: ["id"],
            columnNames: ["gamesId"]
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("genres_games");
      await queryRunner.dropTable("genres");
    }
}
