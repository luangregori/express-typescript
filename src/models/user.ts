import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
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

    @OneToOne(() => Address, address => address.user)
    @JoinColumn()
    address!: Address;
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}