import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { Card } from ".";
import { Address } from "./address";
import { Order } from "./order";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({select: false})
    password_hash!: string;

    @OneToMany(_type => Order, (order: Order) => order.user)
    orders!: Array<Order>

    // @OneToOne(() => Address, address => address.user)
    // @JoinColumn()
    // default_address!: Address;
    
    @OneToMany(_type => Address, (address: Address) => address.user)
    address!: Array<Address>

    // @OneToOne(() => Card, card => card.user)
    // @JoinColumn()
    // default_card!: Card;
    
    @OneToMany(_type => Card, (card: Card) => card.user)
    card!: Array<Card>

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}