import { Game } from '../entities/Game';
import { Genre } from '../entities/Genre';

export interface IGenresRepository {
  findById(id: string): Promise<Genre>;
  findGamesByGenreId(id: string): Promise<Game[]>;
}
