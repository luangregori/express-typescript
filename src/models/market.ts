import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToMany, OneToOne, UpdateDateColumn, OneToMany } from "typeorm";
import { Product, ProductMarket } from './product'
import { Order } from './order'
import { Address } from "./address";

@Entity()
export class Market {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  url_photo!: string;

  // @ManyToMany(() => Product, product => product.markets)
  // products!: Product[];

  @OneToMany(() => ProductMarket, (productMarket) => productMarket.market)
  productMarket!: ProductMarket[];

  @OneToMany(_type => Order, (order: Order) => order.market)
  orders!: Array<Order>

  @OneToOne(() => Address, address => address.market)
  @JoinColumn()
  address!: Address;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}