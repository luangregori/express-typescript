import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from "typeorm";
import { City } from './city'

@Entity()
export class State {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    uf!: string;

    @OneToMany(_type => City, (city: City) => city.state)
    cities!: Array<City>
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}