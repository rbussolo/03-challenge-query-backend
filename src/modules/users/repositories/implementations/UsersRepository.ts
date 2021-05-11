import { Console } from 'node:console';
import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = this.repository.findOneOrFail({ 
      relations: ["games"],
      where: [{ id: user_id }]
    });

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = "select * from users order by first_name";

    return this.repository.query(query); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = `select * from users where lower(first_name) like '${first_name.toLowerCase()}' and lower(last_name) like '${last_name.toLowerCase()}'`;
    
    return this.repository.query(query); // Complete usando raw query
  }
}
