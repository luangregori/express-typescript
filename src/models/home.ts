import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, ManyToOne } from "typeorm";
import { Product, ProductMarket } from './product'

@Entity()
export class Home {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type_product!: string;

    @ManyToOne(_type => Product, (product: Product) => product.id)
    product!: Array<Product>

    @ManyToOne(_type => ProductMarket, (product_market: ProductMarket) => product_market.id)
    product_market!: Array<ProductMarket>
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}