import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany, UpdateDateColumn, ManyToOne } from "typeorm";
import { Product } from './product'
import { Market } from './market'
import { Address } from './address';
import { User } from "./user";

// STATUS
// created
// accepted
// delivery
// finished

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  status!: string;

  @Column(({ type: "double precision" }))
  total_value!: number;

  @ManyToMany(() => Product, product => product.orders)
  products!: Product[];

  @ManyToOne(_type => Market, (market: Market) => market.orders)
  market!: Market

  @ManyToOne(_type => User, (user: User) => user.orders)
  user!: User

  @ManyToOne(_type => Address, (address: Address) => address.orders)
  address!: Address

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}