import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from '../../orders/entities/OrderItem';

import { User } from '../../users/entities/User';
import { Genre } from './Genre';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @ManyToMany(() => Genre, (genre) => genre.games)
  genres: Genre[];

  @OneToMany(() => OrderItem, (order_item) => order_item.game)
  orders_items: OrderItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
