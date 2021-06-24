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

    @Column({ type: "double precision", nullable: true })
    longitude!: number;

    @Column({ type: "double precision", nullable: true })
    latitude!: number;

    @ManyToOne(_type => City, (city: City) => city.adresses)
    city!: City

    @OneToMany(_type => Order, (order: Order) => order.address)
    orders!: Array<Order>

    @OneToOne(() => Market, market => market.address)
    market!: Market;

    @ManyToOne(_type => User, (user: User) => user.address, {onDelete:'CASCADE'})
    user!: Array<User>

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}