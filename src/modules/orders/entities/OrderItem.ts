import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Game } from "../../games/entities/Game";
import { Order } from "./Order";

@Entity('orders_item')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  unit_price: number;

  @Column()
  total_price: number;

  @ManyToOne(() => Game, (game) => game.orders_items)
  game: Game;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}