import { IOrdersRepository } from './../IOrdersRepository';
import { getRepository, Repository } from 'typeorm';
import { OrderItem } from '../../entities/OrderItem';
import { Order } from '../../entities/Order';

export class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }
  
  async findItemsByOrderId(id: string): Promise<OrderItem[]> {
    return await this.repository
      .createQueryBuilder()
      .select("orders_item")
      .from(OrderItem, "orders_item")
      .innerJoin("order", "o", "o.id = orders_item.order_id")
      .where("o.id = :id", { id })
      .getMany();
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repository.findOneOrFail(id);

    return order;
  }
}