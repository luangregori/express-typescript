import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, ManyToOne, OneToMany, UpdateDateColumn} from "typeorm";
import { City } from "./city";
import { Market } from "./market";
import { Order } from "./order";
import { User } from "./user";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    street!: string;

    @Column()
    number!: string;

    @Column()
    district!: string;

    @Column()
    cep!: string;

    @Column({ nullable: true })
    complement!: string;

    @ManyToOne(_type => City, (city: City) => city.adresses)
    city!: City

    @OneToMany(_type => Order, (order: Order) => order.address)
    orders!: Array<Order>

    @OneToOne(() => Market, market => market.address)
    market!: Market;

    @OneToOne(() => User, user => user.address)
    user!: Market;
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}