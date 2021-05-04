import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, ManyToOne } from "typeorm";
import { Category } from './category'

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

    @Column(({ type: "double precision" }))
    price!: number;

    @Column({ type: "double precision", nullable: true })
    old_price!: number;

    @Column({ nullable: true })
    discount!: number;

    @ManyToOne(_type => Category, (category: Category) => category.products)
    category!: Array<Category>

    // @OneToMany(_type=> Comment, (comment: Comment) => comment.user)
    // comments!: Array<Comment>;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}