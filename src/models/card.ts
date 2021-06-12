import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, ManyToOne, OneToMany, UpdateDateColumn} from "typeorm";
import { Order } from "./order";
import { User } from "./user";

@Entity()
export class Card {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    number!: string;

    @Column()
    name!: string;

    @Column()
    due_date!: string;

    @Column()
    cvv!: string;

    @Column()
    cpf!: string;

    // @OneToMany(_type => Order, (order: Order) => order.address)
    // orders!: Array<Order>

    @ManyToOne(_type => User, (user: User) => user.address, {onDelete:'CASCADE'})
    user!: Array<User>

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}