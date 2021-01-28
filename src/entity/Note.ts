import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn, CreateDateColumn } from "typeorm";
import { Length } from "class-validator"
import { User } from "./User";

@Entity({ name: "notes" })
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @Length(5, 40)
    title: string;
    
    @Column()
    @Length(10, 300)
    content: string;

    @Column({ default: false })
    isFavourite: boolean;

    @Column()
    authorId: number;
    @OneToMany(() => User, user => user.notes)
    @JoinColumn({ name: "authorId" })
    author: User;
}