import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    OneToMany, 
    UpdateDateColumn, 
    ManyToOne,
    ManyToMany,
    JoinTable,
    PrimaryColumn,
 } from "typeorm";
import { Category } from './category'
import { Home } from './home'
import { Market } from './market'
import { Order } from './order'

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    url_photo!: string;

    // @Column({ type: "double precision", nullable: true })
    // price!: number;

    // @Column({ type: "double precision", nullable: true })
    // old_price!: number;

    // @Column({ nullable: true })
    // discount!: number;

    @ManyToOne(_type => Category, (category: Category) => category.products)
    category!: Array<Category>

    @OneToMany(_type => Home, (home: Home) => home.product)
    home!: Array<Home>

    @OneToMany(() => ProductMarket, (productMarket) => productMarket.product)
    productMarket!: ProductMarket[];

    // @ManyToMany(() => Market, market => market.products)
    // @JoinTable()
    // markets!: Array<Market>;    

    @ManyToMany(() => Order, order => order.products)
    @JoinTable()
    orders!: Array<Order>;
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

@Entity()
export class ProductMarket {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "double precision" })
    price!: number;

    @Column({ type: "double precision", nullable: true })
    old_price!: number;

    @Column({ nullable: true })
    discount!: number;

    @ManyToOne(() => Product, (product) => product.productMarket)
    product!: Product;

    @ManyToOne(() => Market, (market) => market.productMarket)
    market!: Market;
}
