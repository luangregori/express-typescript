import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, UpdateDateColumn} from "typeorm";
import { Address } from './address';
import { State } from './state'

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
    
    @ManyToOne(_type => State, (state: State) => state.cities)
    state!: State

    @OneToMany(_type => Address, (address: Address) => address.city)
    adresses!: Array<Address>

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}