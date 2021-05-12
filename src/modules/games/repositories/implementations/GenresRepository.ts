import { getRepository, Repository } from 'typeorm';
import { Game } from '../../entities/Game';
import { Genre } from '../../entities/Genre';
import { IGenresRepository } from './../IGenresRepository';

export class GenresRepository implements IGenresRepository {
  private repository: Repository<Genre>;

  constructor() {
    this.repository = getRepository(Genre);
  }

  async findById(id: string): Promise<Genre> {
    const genre = await this.repository.findOneOrFail(id);

    return genre;
  }

  async findGamesByGenreId(id: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder()
      .select("game")
      .from(Game, "games")
      .innerJoin("genres_games", "gg", "gg.gamesId = games.id")
      .where("gg.genresId = :id", {id})
      .getMany();
  }
}