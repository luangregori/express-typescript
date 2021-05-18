import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password_hash!: string;

    // @OneToMany(_type => Post, (post: Post) => post.user)
    // posts!: Array<Post>

    // @OneToMany(_type=> Comment, (comment: Comment) => comment.user)
    // comments!: Array<Comment>;
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}