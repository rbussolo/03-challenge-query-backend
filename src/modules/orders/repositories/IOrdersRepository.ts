import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";

export interface IOrdersRepository {
  findById(id: string): Promise<Order>;
  findItemsByOrderId(id: string): Promise<OrderItem[]>;
}
