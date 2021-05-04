import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Product } from './product'

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    url_photo!: string;

    @OneToMany(_type => Product, (product: Product) => product.category)
    products!: Array<Product>

    // @OneToMany(_type=> Comment, (comment: Comment) => comment.user)
    // comments!: Array<Comment>;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}