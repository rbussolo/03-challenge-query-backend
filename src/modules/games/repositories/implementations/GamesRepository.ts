import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where("lower(title) like :title", { title: `%${param.toLowerCase()}%` })
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const query = "select count(1) from games";

    return this.repository.query(query); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .select("users")
      .from(User, "users")
      .innerJoin("users_games_games", "ug", "ug.usersId = users.id")
      .where("ug.gamesId = :id", { id })
      .getMany();
  }
}
