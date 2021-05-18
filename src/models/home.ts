import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, ManyToOne } from "typeorm";
import { Product } from './product'

@Entity()
export class Home {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type_product!: string;

    @ManyToOne(_type => Product, (product: Product) => product.id)
    product!: Array<Product>
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}